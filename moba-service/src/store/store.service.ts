import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../database/entity/item.entity';
import { Inventory } from '../database/entity/inventory.entity';
import { Skill } from '../database/entity/skill.entity';
import { HeroSkill } from '../database/entity/hero-skill.entity';
import { PurchaseItemEntryDto, PurchaseItemType } from './dto/purchase-item.dto';
import { HeroesService } from '../heroes/heroes.service';
import { Hero } from '../database/entity/hero.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    @InjectRepository(HeroSkill)
    private readonly heroSkillRepository: Repository<HeroSkill>,
    @InjectRepository(Hero)
    private readonly heroRepository: Repository<Hero>,
    private readonly heroesService: HeroesService,
  ) {}

  async getAvailableItems(userId: string) {
    const { hero: heroDto } = await this.heroesService.findActiveHero(userId);
    const items = await this.itemRepository.find();
    const skills = await this.skillRepository.find();

    // Filter out skills that the hero doesn't meet requirements for
    const availableSkills = skills.filter(skill => 
      heroDto.attributes.strength >= skill.requiredStrength &&
      heroDto.attributes.dexterity >= skill.requiredDexterity &&
      heroDto.attributes.intelligence >= skill.requiredIntelligence
    );

    return {
      items,
      skills: availableSkills
    };
  }

  async purchaseItems(userId: string, items: PurchaseItemEntryDto[]): Promise<{ remainingMoney: number }> {
    const { hero: heroDto } = await this.heroesService.findActiveHero(userId);

    // Get the actual hero entity for updates
    const hero = await this.heroRepository.findOne({
      where: { id: heroDto.id }
    });

    if (!hero) {
      throw new NotFoundException('Hero not found');
    }

    // Calculate total cost
    let totalCost = 0;
    const itemsToPurchase: { item: Item; quantity: number }[] = [];
    const skillsToPurchase: Skill[] = [];

    for (const purchaseItem of items) {
      if (purchaseItem.type === PurchaseItemType.ITEM) {
        const item = await this.itemRepository.findOne({
          where: { id: purchaseItem.itemId }
        });

        if (!item) {
          throw new NotFoundException(`Item with ID ${purchaseItem.itemId} not found`);
        }

        // Check if hero already has this item (non-consumable items only)
        if (!item.isConsumable) {
          const existingItem = await this.inventoryRepository.findOne({
            where: {
              hero: { id: hero.id },
              item: { id: item.id }
            }
          });

          if (existingItem) {
            throw new BadRequestException(`You already have the item ${item.name}`);
          }
        }

        totalCost += item.price * purchaseItem.quantity;
        itemsToPurchase.push({ item, quantity: purchaseItem.quantity });
      } else {
        const skill = await this.skillRepository.findOne({
          where: { id: purchaseItem.itemId }
        });

        if (!skill) {
          throw new NotFoundException(`Skill with ID ${purchaseItem.itemId} not found`);
        }

        // Check if hero already has this skill
        const existingSkill = await this.heroSkillRepository.findOne({
          where: {
            hero: { id: hero.id },
            skill: { id: skill.id }
          }
        });

        if (existingSkill) {
          throw new BadRequestException(`You already have the skill ${skill.name}`);
        }

        // Validate skill requirements
        if (heroDto.attributes.strength < skill.requiredStrength) {
          throw new BadRequestException(
            `You need ${skill.requiredStrength} Strength to learn ${skill.name} (you have ${heroDto.attributes.strength})`
          );
        }
        if (heroDto.attributes.dexterity < skill.requiredDexterity) {
          throw new BadRequestException(
            `You need ${skill.requiredDexterity} Dexterity to learn ${skill.name} (you have ${heroDto.attributes.dexterity})`
          );
        }
        if (heroDto.attributes.intelligence < skill.requiredIntelligence) {
          throw new BadRequestException(
            `You need ${skill.requiredIntelligence} Intelligence to learn ${skill.name} (you have ${heroDto.attributes.intelligence})`
          );
        }

        totalCost += skill.price;
        skillsToPurchase.push(skill);
      }
    }

    // Check if hero has enough money
    if (hero.money < totalCost) {
      throw new BadRequestException('Not enough money to purchase all items');
    }

    // Update hero's money
    hero.money -= totalCost;
    await this.heroRepository.save(hero);

    // Add items to inventory
    for (const { item, quantity } of itemsToPurchase) {
      const inventory = this.inventoryRepository.create({
        hero,
        item,
        quantity,
        acquiredAt: new Date()
      });
      await this.inventoryRepository.save(inventory);
    }

    // Add skills to hero
    for (const skill of skillsToPurchase) {
      const heroSkill = this.heroSkillRepository.create({
        hero,
        skill,
        level: 1,
      });
      await this.heroSkillRepository.save(heroSkill);
    }

    return { remainingMoney: hero.money };
  }
} 