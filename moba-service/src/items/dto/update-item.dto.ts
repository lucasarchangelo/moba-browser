import { IsString, IsNumber, IsEnum, IsBoolean, IsOptional, IsUrl, Min, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemRarity } from '../../database/enums/item-rarity.enum';
import { ItemSlotType } from '../../database/enums/item-slot-type.enum';

export class UpdateItemDto {
  @ApiProperty({
    description: 'The name of the item',
    example: 'Sword of the Gods',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The description of the item',
    example: 'A legendary sword that grants immense power to its wielder',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The type of the item',
    example: 'Weapon',
    required: false,
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({
    description: 'The damage value of the item',
    example: 50,
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  damage?: number;

  @ApiProperty({
    description: 'The armor value of the item',
    example: 30,
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  armor?: number;

  @ApiProperty({
    description: 'The magic resistance value of the item',
    example: 20,
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  magicResistance?: number;

  @ApiProperty({
    description: 'The health value of the item',
    example: 100,
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  health?: number;

  @ApiProperty({
    description: 'The mana value of the item',
    example: 50,
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  mana?: number;

  @ApiProperty({
    description: 'The strength value of the item',
    example: 10,
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  strength?: number;

  @ApiProperty({
    description: 'The agility value of the item',
    example: 10,
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  agility?: number;

  @ApiProperty({
    description: 'The intelligence value of the item',
    example: 10,
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  intelligence?: number;

  @ApiProperty({
    description: 'The name of the image file',
    example: 'sword.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'The price of the item',
    example: 1000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({
    description: 'The rarity of the item',
    enum: ItemRarity,
    example: ItemRarity.RARE,
    required: false,
  })
  @IsOptional()
  @IsEnum(ItemRarity)
  rarity?: ItemRarity;

  @ApiProperty({
    description: 'The slot type of the item',
    enum: ItemSlotType,
    example: ItemSlotType.WEAPON,
    required: false,
  })
  @IsOptional()
  @IsEnum(ItemSlotType)
  slotType?: ItemSlotType;

  @ApiProperty({
    description: 'Whether the item is consumable',
    example: false,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isConsumable?: boolean;

  @ApiProperty({
    description: 'Additional effects of the item',
    example: { 'criticalChance': 0.15, 'lifesteal': 0.1 },
    default: {},
    required: false,
  })
  @IsOptional()
  @IsObject()
  effects?: Record<string, any>;
} 