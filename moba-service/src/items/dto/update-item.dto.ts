import { IsString, IsNumber, IsEnum, IsBoolean, IsOptional, IsUrl, Min, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemSlotType } from 'src/database/enums/item-slot-type.enum';

export class UpdateItemDto {
  @ApiProperty({ description: 'Item name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Item description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Base health bonus' })
  @IsNumber()
  @IsOptional()
  baseHealth?: number;

  @ApiProperty({ description: 'Base mana bonus' })
  @IsNumber()
  @IsOptional()
  baseMana?: number;

  @ApiProperty({ description: 'Base armor bonus' })
  @IsNumber()
  @IsOptional()
  baseArmor?: number;

  @ApiProperty({ description: 'Base magic resistance bonus' })
  @IsNumber()
  @IsOptional()
  baseMagicResistance?: number;

  @ApiProperty({ description: 'Base accuracy bonus' })
  @IsNumber()
  @IsOptional()
  baseAccuracy?: number;

  @ApiProperty({ description: 'Base damage bonus' })
  @IsNumber()
  @IsOptional()
  baseDamage?: number;

  @ApiProperty({ description: 'Base magic damage bonus' })
  @IsNumber()
  @IsOptional()
  baseMagicDamage?: number;

  @ApiProperty({ description: 'Whether the item is consumable' })
  @IsBoolean()
  @IsOptional()
  isConsumable?: boolean;

  @ApiProperty({ 
    description: 'Item slot type', 
    enum: ItemSlotType,
    example: ItemSlotType.WEAPON
  })
  @IsEnum(ItemSlotType)
  @IsOptional()
  slotType?: ItemSlotType;

  @ApiProperty({ description: 'Item price' })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ description: 'Item image URL' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ 
    description: 'Item effects', 
    type: 'object',
    additionalProperties: true
  })
  @IsOptional()
  effects?: Record<string, any>;
} 