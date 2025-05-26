import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../database/entity/inventory.entity';
import { InventoryResponseDto, InventoryItemResponseDto } from './dto/inventory-response.dto';
import { HeroesService } from '../heroes/heroes.service';
import { EffectDto } from 'src/items/dto/item-response.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    private readonly heroesService: HeroesService,
  ) {}

  async getHeroInventory(userId: string): Promise<InventoryResponseDto> {
    const { hero } = await this.heroesService.findActiveHero(userId);

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
        effects: inv.item.effects?.map(effect => ({
            type: effect.type,
            target: effect.target,
            stat: effect.stat,
            value: typeof effect.value === 'string' ? parseFloat(effect.value) : effect.value,
            duration: effect.duration,
            chance: effect.chance
          })) || [],
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