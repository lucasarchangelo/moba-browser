import { ApiProperty } from '@nestjs/swagger';
import { EffectType } from '../../database/enums/effects/effect-type.enum';
import { EffectTarget } from '../../database/enums/effects/effect-target.enum';
import { StatType } from '../../database/enums/effects/effec-stat-type.enum';

interface Effect {
  type: EffectType;
  target: EffectTarget;
  value: number | string;
  stat?: StatType;
  duration?: number;
  chance?: number;
}
export class InventoryItemResponseDto {
  @ApiProperty({ description: 'Inventory item ID' })
  id: string;

  @ApiProperty({ description: 'Quantity of the item' })
  quantity: number;

  @ApiProperty({ description: 'Item details' })
  item: {
    id: string;
    name: string;
    description: string;
    baseHealth: number;
    baseMana: number;
    baseArmor: number;
    baseMagicResistance: number;
    baseAccuracy: number;
    baseDamage: number;
    baseMagicDamage: number;
    isConsumable: boolean;
    slotType: string;
    price: number;
    imageUrl: string;
    effects: Effect[];
    createdAt: Date;
    updatedAt: Date;
  };

  @ApiProperty({ description: 'When the item was added to inventory' })
  createdAt: Date;

  @ApiProperty({ description: 'When the item was acquired' })
  acquiredAt: Date;
}

export class InventoryResponseDto {
  @ApiProperty({ description: 'Hero ID' })
  heroId: string;

  @ApiProperty({ type: [InventoryItemResponseDto], description: 'List of items in inventory' })
  items: InventoryItemResponseDto[];
} 