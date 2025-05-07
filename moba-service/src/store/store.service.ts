import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../database/entity/item.entity';
import { Inventory } from '../database/entity/inventory.entity';
import { Hero } from '../database/entity/hero.entity';
import { Season } from '../database/entity/season.entity';
import { PurchaseItemDto } from './dto/purchase-item.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(Hero)
    private readonly heroRepository: Repository<Hero>,
    @InjectRepository(Season)
    private readonly seasonRepository: Repository<Season>,
  ) {}

  async getAvailableItems(userId: string) {
    // Get active season
    const activeSeason = await this.seasonRepository.findOne({
      where: { isActive: true }
    });

    if (!activeSeason) {
      throw new NotFoundException('No active season found');
    }

    // Check if user has an active hero in the current season
    const activeHero = await this.heroRepository.findOne({
      where: {
        userId,
        seasonId: activeSeason.id
      }
    });

    if (!activeHero) {
      throw new BadRequestException('You need an active hero in the current season to access the store');
    }

    // Return all available items
    return this.itemRepository.find();
  }

  async purchaseItem(userId: string, purchaseItemDto: PurchaseItemDto) {
    const { itemId, quantity } = purchaseItemDto;

    // Get active season
    const activeSeason = await this.seasonRepository.findOne({
      where: { isActive: true }
    });

    if (!activeSeason) {
      throw new NotFoundException('No active season found');
    }

    // Check if user has an active hero in the current season
    const activeHero = await this.heroRepository.findOne({
      where: {
        userId,
        seasonId: activeSeason.id
      }
    });

    if (!activeHero) {
      throw new BadRequestException('You need an active hero in the current season to purchase items');
    }

    // Get the item
    const item = await this.itemRepository.findOne({
      where: { id: itemId }
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    // Calculate total cost
    const totalCost = item.price * quantity;

    // Check if hero has enough money
    if (activeHero.money < totalCost) {
      throw new BadRequestException('Not enough money to purchase this item');
    }

    // Check if user already has this item
    const existingInventory = await this.inventoryRepository.findOne({
      where: {
        heroId: activeHero.id,
        itemId: item.id
      }
    });

    // If item is not consumable and user already has it
    if (!item.isConsumable && existingInventory) {
      throw new BadRequestException('You already own this non-consumable item');
    }

    // If item is consumable, check quantity limit
    if (item.isConsumable) {
      const totalQuantity = (existingInventory?.quantity || 0) + quantity;
      if (totalQuantity > 5) {
        throw new BadRequestException('You cannot have more than 5 of the same consumable item');
      }
    }

    // Deduct money from hero
    activeHero.money -= totalCost;
    await this.heroRepository.save(activeHero);

    // Create or update inventory
    if (existingInventory) {
      existingInventory.quantity += quantity;
      await this.inventoryRepository.save(existingInventory);
    } else {
      const newInventory = this.inventoryRepository.create({
        heroId: activeHero.id,
        itemId: item.id,
        quantity
      });
      await this.inventoryRepository.save(newInventory);
    }

    return { 
      message: 'Item purchased successfully',
      remainingMoney: activeHero.money
    };
  }
} 