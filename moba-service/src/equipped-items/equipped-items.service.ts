import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquippedItem } from '../database/entity/equipped-item.entity';
import { Hero } from '../database/entity/hero.entity';
import { Item } from '../database/entity/item.entity';
import { ItemSlotType } from '../database/enums/item-slot-type.enum';
import { EquipItemDto } from './dto/equip-item.dto';
import { EquippedItemResponseDto } from './dto/equipped-item-response.dto';
import { Logger } from '@nestjs/common';
import { SeasonsService } from '../seasons/seasons.service';

@Injectable()
export class EquippedItemsService {
  private readonly logger = new Logger(EquippedItemsService.name);

  constructor(
    @InjectRepository(EquippedItem)
    private equippedItemRepository: Repository<EquippedItem>,
    @InjectRepository(Hero)
    private heroRepository: Repository<Hero>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    private readonly seasonsService: SeasonsService,
  ) {}

  /**
   * Gets the active hero for a user in the current season
   * @param userId The ID of the user
   * @returns The active hero
   */
  private async getActiveHero(userId: string): Promise<Hero> {
    const activeSeason = await this.seasonsService.findActiveSeason();
    if (!activeSeason) {
      throw new NotFoundException('No active season found');
    }

    const hero = await this.heroRepository.findOne({
      where: {
        userId,
        seasonId: activeSeason.id,
      },
    });

    if (!hero) {
      throw new NotFoundException('No active hero found for the current season');
    }

    return hero;
  }

  /**
   * Equips an item to the active hero
   * @param equipItemDto The DTO containing the item ID
   * @param userId The ID of the user
   * @returns The equipped item response
   */
  async equipItem(equipItemDto: EquipItemDto, userId: string): Promise<EquippedItemResponseDto> {
    this.logger.log(`Attempting to equip item ${equipItemDto.itemId} for user ${userId}`);

    // Get the active hero
    const hero = await this.getActiveHero(userId);

    // Find the item
    const item = await this.itemRepository.findOne({
      where: { id: equipItemDto.itemId }
    });

    if (!item) {
      this.logger.error(`Item ${equipItemDto.itemId} not found`);
      throw new NotFoundException('Item not found');
    }

    // Check if item is consumable
    if (item.isConsumable) {
      this.logger.error(`Item ${equipItemDto.itemId} is consumable and cannot be equipped`);
      throw new BadRequestException('Consumable items cannot be equipped');
    }

    // Check if hero already has an item in this slot
    const existingEquippedItem = await this.equippedItemRepository.findOne({
      where: {
        hero: { id: hero.id },
        item: { slotType: item.slotType }
      }
    });

    if (existingEquippedItem) {
      this.logger.log(`Unequipping existing item ${existingEquippedItem.id} from slot ${item.slotType}`);
      await this.equippedItemRepository.remove(existingEquippedItem);
    }

    // Create new equipped item
    const equippedItem = new EquippedItem();
    equippedItem.hero = hero;
    equippedItem.item = item;
    equippedItem.slot = item.slotType;

    const savedEquippedItem = await this.equippedItemRepository.save(equippedItem);
    this.logger.log(`Successfully equipped item ${item.id} to hero ${hero.id}`);

    return this.mapToResponseDto(savedEquippedItem);
  }

  /**
   * Gets all equipped items for the active hero
   * @param userId The ID of the user
   * @returns Array of equipped items
   */
  async getActiveHeroEquippedItems(userId: string): Promise<EquippedItemResponseDto[]> {
    this.logger.log(`Fetching equipped items for user ${userId}`);

    const hero = await this.getActiveHero(userId);

    const equippedItems = await this.equippedItemRepository.find({
      where: { hero: { id: hero.id } },
      relations: ['item']
    });

    return equippedItems.map(item => this.mapToResponseDto(item));
  }

  /**
   * Unequips an item from the active hero
   * @param equippedItemId The ID of the equipped item to unequip
   * @param userId The ID of the user
   */
  async unequipItem(equippedItemId: string, userId: string): Promise<void> {
    this.logger.log(`Attempting to unequip item ${equippedItemId} for user ${userId}`);

    const hero = await this.getActiveHero(userId);

    const equippedItem = await this.equippedItemRepository.findOne({
      where: {
        id: equippedItemId,
        hero: { id: hero.id }
      }
    });

    if (!equippedItem) {
      this.logger.error(`Equipped item ${equippedItemId} not found`);
      throw new NotFoundException('Equipped item not found');
    }

    await this.equippedItemRepository.remove(equippedItem);
    this.logger.log(`Successfully unequipped item ${equippedItemId}`);
  }

  /**
   * Maps an EquippedItem entity to a response DTO
   * @param equippedItem The equipped item entity
   * @returns The response DTO
   */
  private mapToResponseDto(equippedItem: EquippedItem): EquippedItemResponseDto {
    return {
      id: equippedItem.id,
      heroId: equippedItem.hero.id,
      itemId: equippedItem.item.id,
      slot: equippedItem.slot,
      createdAt: equippedItem.createdAt
    };
  }
} 