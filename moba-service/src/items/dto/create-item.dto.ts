import { IsString, IsNumber, IsEnum, IsBoolean, IsOptional, IsUrl, Min, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemRarity } from '../../database/enums/item-rarity.enum';
import { ItemSlotType } from '../../database/enums/item-slot-type.enum';

export class CreateItemDto {
  @ApiProperty({
    description: 'The name of the item',
    example: 'Sword of the Gods',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the item',
    example: 'A legendary sword that grants immense power to its wielder',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The type of the item',
    example: 'Weapon',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'The damage value of the item',
    example: 50,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  damage?: number;

  @ApiProperty({
    description: 'The armor value of the item',
    example: 30,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  armor?: number;

  @ApiProperty({
    description: 'The magic resistance value of the item',
    example: 20,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  magicResistance?: number;

  @ApiProperty({
    description: 'The health value of the item',
    example: 100,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  health?: number;

  @ApiProperty({
    description: 'The mana value of the item',
    example: 50,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  mana?: number;

  @ApiProperty({
    description: 'The strength value of the item',
    example: 10,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  strength?: number;

  @ApiProperty({
    description: 'The agility value of the item',
    example: 10,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  agility?: number;

  @ApiProperty({
    description: 'The intelligence value of the item',
    example: 10,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  intelligence?: number;

  @ApiProperty({
    description: 'the pah to the image',
    example: 'sword.png',
  })
  @IsString()
  imageUrl: string;

  @ApiProperty({
    description: 'The price of the item',
    example: 1000,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'The rarity of the item',
    enum: ItemRarity,
    example: ItemRarity.RARE,
  })
  @IsEnum(ItemRarity)
  rarity: ItemRarity;

  @ApiProperty({
    description: 'The slot type of the item',
    enum: ItemSlotType,
    example: ItemSlotType.WEAPON,
  })
  @IsEnum(ItemSlotType)
  slotType: ItemSlotType;

  @ApiProperty({
    description: 'Whether the item is consumable',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isConsumable?: boolean;

  @ApiProperty({
    description: 'Additional effects of the item',
    example: { 'criticalChance': 0.15, 'lifesteal': 0.1 },
    default: {},
  })
  @IsObject()
  @IsOptional()
  effects?: Record<string, any>;
} 