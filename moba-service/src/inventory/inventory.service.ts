import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../database/entity/inventory.entity';
import { Hero } from '../database/entity/hero.entity';
import { Season } from '../database/entity/season.entity';
import { InventoryResponseDto, InventoryItemResponseDto } from './dto/inventory-response.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(Hero)
    private readonly heroRepository: Repository<Hero>,
    @InjectRepository(Season)
    private readonly seasonRepository: Repository<Season>,
  ) {}

  async getHeroInventory(userId: string): Promise<InventoryResponseDto> {
    // Get active season
    const activeSeason = await this.seasonRepository.findOne({
      where: { isActive: true }
    });

    if (!activeSeason) {
      throw new NotFoundException('No active season found');
    }

    // Get hero for the user in current season
    const hero = await this.heroRepository.findOne({
      where: {
        userId,
        seasonId: activeSeason.id
      }
    });

    if (!hero) {
      throw new BadRequestException('You need an active hero in the current season to view inventory');
    }

    // Get all inventory items for the hero with item details
    const inventoryItems = await this.inventoryRepository.find({
      where: { heroId: hero.id },
      relations: ['item'],
      order: {
        createdAt: 'DESC'
      }
    });

    // Map to response DTO
    const items: InventoryItemResponseDto[] = inventoryItems.map(inv => ({
      id: inv.id,
      quantity: inv.quantity,
      item: {
        id: inv.item.id,
        name: inv.item.name,
        description: inv.item.description,
        baseHealth: inv.item.baseHealth,
        baseMana: inv.item.baseMana,
        baseArmor: inv.item.baseArmor,
        baseMagicResistance: inv.item.baseMagicResistance,
        baseAccuracy: inv.item.baseAccuracy,
        baseDamage: inv.item.baseDamage,
        baseMagicDamage: inv.item.baseMagicDamage,
        isConsumable: inv.item.isConsumable,
        slotType: inv.item.slotType,
        price: inv.item.price,
        imageUrl: inv.item.imageUrl,
        effects: inv.item.effects,
        createdAt: inv.item.createdAt,
        updatedAt: inv.item.updatedAt
      },
      createdAt: inv.createdAt,
      acquiredAt: inv.acquiredAt
    }));

    return {
      heroId: hero.id,
      items
    };
  }
} 