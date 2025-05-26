import { ApiProperty } from '@nestjs/swagger';
import { ItemSlotType } from '../../database/enums/item-slot-type.enum';
import { EffectType } from '../../database/enums/effects/effect-type.enum';
import { EffectTarget } from '../../database/enums/effects/effect-target.enum';
import { StatType } from '../../database/enums/effects/effec-stat-type.enum';

export class EffectDto {
  @ApiProperty({ enum: EffectType, description: 'Type of effect' })
  type: EffectType;

  @ApiProperty({ enum: EffectTarget, description: 'Target of the effect' })
  target: EffectTarget;

  @ApiProperty({ enum: StatType, description: 'Stat affected by the effect', required: false })
  stat?: StatType;

  @ApiProperty({ description: 'Value of the effect' })
  value: number;

  @ApiProperty({ description: 'Duration of the effect in seconds (0 for permanent)', required: false })
  duration?: number;

  @ApiProperty({ description: 'Chance of the effect occurring (0-100)', required: false })
  chance?: number;
}

export class ItemResponseDto {
  @ApiProperty({ description: 'Unique identifier of the item' })
  id: string;

  @ApiProperty({ description: 'Name of the item' })
  name: string;

  @ApiProperty({ description: 'Description of the item' })
  description: string;

  @ApiProperty({ description: 'Base health bonus' })
  baseHealth: number;

  @ApiProperty({ description: 'Base mana bonus' })
  baseMana: number;

  @ApiProperty({ description: 'Base armor bonus' })
  baseArmor: number;

  @ApiProperty({ description: 'Base magic resistance bonus' })
  baseMagicResistance: number;

  @ApiProperty({ description: 'Base accuracy bonus' })
  baseAccuracy: number;

  @ApiProperty({ description: 'Base damage bonus' })
  baseDamage: number;

  @ApiProperty({ description: 'Base magic damage bonus' })
  baseMagicDamage: number;

  @ApiProperty({ description: 'Whether the item is consumable' })
  isConsumable: boolean;

  @ApiProperty({ enum: ItemSlotType, description: 'Slot type of the item' })
  slotType: ItemSlotType;

  @ApiProperty({ description: 'Price of the item' })
  price: number;

  @ApiProperty({ description: 'URL of the item image', required: false })
  imageUrl?: string;

  @ApiProperty({ type: [EffectDto], description: 'Effects of the item' })
  effects: EffectDto[];

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
} 