import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../database/entity/item.entity';
import { Inventory } from '../database/entity/inventory.entity';
import { Hero } from '../database/entity/hero.entity';
import { Season } from '../database/entity/season.entity';
import { PurchaseItemDto } from './dto/purchase-item.dto';
import { In } from 'typeorm';

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
    const { items } = purchaseItemDto;

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

    // Get all items being purchased
    const itemIds = items.map(item => item.itemId);
    const storeItems = await this.itemRepository.findByIds(itemIds);

    if (storeItems.length !== itemIds.length) {
      throw new NotFoundException('One or more items not found');
    }

    // Calculate total cost and validate purchases
    let totalCost = 0;
    const existingInventories = await this.inventoryRepository.find({
      where: {
        heroId: activeHero.id,
        itemId: In(itemIds)
      }
    });

    // Create a map of existing inventories for quick lookup
    const existingInventoryMap = new Map(
      existingInventories.map(inv => [inv.itemId, inv])
    );

    // Validate all purchases before processing
    for (const purchase of items) {
      const item = storeItems.find(i => i.id === purchase.itemId);
      if (!item) continue;

      // Check if item is not consumable and user already has it
      if (!item.isConsumable && existingInventoryMap.has(item.id)) {
        throw new BadRequestException(`You already own the non-consumable item: ${item.name}`);
      }

      // Check consumable quantity limits
      if (item.isConsumable) {
        const existingQuantity = existingInventoryMap.get(item.id)?.quantity || 0;
        const totalQuantity = existingQuantity + purchase.quantity;
        if (totalQuantity > 5) {
          throw new BadRequestException(`You cannot have more than 5 of the consumable item: ${item.name}`);
        }
      }

      totalCost += item.price * purchase.quantity;
    }

    // Check if hero has enough money
    if (activeHero.money < totalCost) {
      throw new BadRequestException('Not enough money to purchase all items');
    }

    // Process all purchases
    for (const purchase of items) {
      const item = storeItems.find(i => i.id === purchase.itemId);
      if (!item) continue;

      const existingInventory = existingInventoryMap.get(item.id);

      if (existingInventory) {
        existingInventory.quantity += purchase.quantity;
        await this.inventoryRepository.save(existingInventory);
      } else {
        const newInventory = this.inventoryRepository.create({
          heroId: activeHero.id,
          itemId: item.id,
          quantity: purchase.quantity
        });
        await this.inventoryRepository.save(newInventory);
      }
    }

    // Deduct total cost from hero
    activeHero.money -= totalCost;
    await this.heroRepository.save(activeHero);

    return {
      message: 'Items purchased successfully',
      remainingMoney: activeHero.money
    };
  }
} 