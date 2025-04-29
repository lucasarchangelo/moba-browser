import { ApiProperty } from '@nestjs/swagger';
import { ItemRarity } from '../../database/enums/item-rarity.enum';
import { ItemSlotType } from '../../database/enums/item-slot-type.enum';

export class ItemResponseDto {
  @ApiProperty({ description: 'The unique identifier of the item' })
  id: string;

  @ApiProperty({ description: 'The name of the item' })
  name: string;

  @ApiProperty({ description: 'The description of the item' })
  description: string;

  @ApiProperty({ description: 'The type of the item' })
  type: string;

  @ApiProperty({ description: 'The damage value of the item' })
  damage: number;

  @ApiProperty({ description: 'The armor value of the item' })
  armor: number;

  @ApiProperty({ description: 'The magic resistance value of the item' })
  magicResistance: number;

  @ApiProperty({ description: 'The health value of the item' })
  health: number;

  @ApiProperty({ description: 'The mana value of the item' })
  mana: number;

  @ApiProperty({ description: 'The strength value of the item' })
  strength: number;

  @ApiProperty({ description: 'The agility value of the item' })
  agility: number;

  @ApiProperty({ description: 'The intelligence value of the item' })
  intelligence: number;

  @ApiProperty({ description: 'The URL of the item image' })
  imageUrl: string;

  @ApiProperty({ description: 'The price of the item' })
  price: number;

  @ApiProperty({ description: 'The rarity of the item', enum: ItemRarity })
  rarity: ItemRarity;

  @ApiProperty({ description: 'The slot type of the item', enum: ItemSlotType })
  slotType: ItemSlotType;

  @ApiProperty({ description: 'Whether the item is consumable' })
  isConsumable: boolean;

  @ApiProperty({ description: 'Additional effects of the item' })
  effects: Record<string, any>;

  @ApiProperty({ description: 'The date when the item was created' })
  createdAt: Date;

  @ApiProperty({ description: 'The date when the item was last updated' })
  updatedAt: Date;
} 