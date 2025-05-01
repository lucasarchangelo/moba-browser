import { ApiProperty } from '@nestjs/swagger';
import { ItemSlotType } from '../../database/enums/item-slot-type.enum';

export class ItemResponseDto {
  @ApiProperty({ description: 'Item ID' })
  id: string;

  @ApiProperty({ description: 'Item name' })
  name: string;

  @ApiProperty({ description: 'Item description' })
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

  @ApiProperty({ 
    description: 'Item slot type', 
    enum: ItemSlotType,
    example: ItemSlotType.WEAPON
  })
  slotType: ItemSlotType;

  @ApiProperty({ description: 'Item price' })
  price: number;

  @ApiProperty({ description: 'Item image URL' })
  imageUrl: string;

  @ApiProperty({ 
    description: 'Item effects', 
    type: 'object',
    additionalProperties: true
  })
  effects: Record<string, any>;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
} 