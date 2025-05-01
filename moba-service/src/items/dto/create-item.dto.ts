import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemSlotType } from '../../database/enums/item-slot-type.enum';

export class CreateItemDto {
  @ApiProperty({ description: 'Item name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Item description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Base health bonus', default: 0 })
  @IsNumber()
  @IsOptional()
  baseHealth?: number;

  @ApiProperty({ description: 'Base mana bonus', default: 0 })
  @IsNumber()
  @IsOptional()
  baseMana?: number;

  @ApiProperty({ description: 'Base armor bonus', default: 0 })
  @IsNumber()
  @IsOptional()
  baseArmor?: number;

  @ApiProperty({ description: 'Base magic resistance bonus', default: 0 })
  @IsNumber()
  @IsOptional()
  baseMagicResistance?: number;

  @ApiProperty({ description: 'Base accuracy bonus', default: 0 })
  @IsNumber()
  @IsOptional()
  baseAccuracy?: number;

  @ApiProperty({ description: 'Base damage bonus', default: 0 })
  @IsNumber()
  @IsOptional()
  baseDamage?: number;

  @ApiProperty({ description: 'Base magic damage bonus', default: 0 })
  @IsNumber()
  @IsOptional()
  baseMagicDamage?: number;

  @ApiProperty({ description: 'Whether the item is consumable', default: false })
  @IsBoolean()
  @IsOptional()
  isConsumable?: boolean;

  @ApiProperty({ 
    description: 'Item slot type', 
    enum: ItemSlotType,
    example: ItemSlotType.WEAPON
  })
  @IsEnum(ItemSlotType)
  @IsNotEmpty()
  slotType: ItemSlotType;

  @ApiProperty({ description: 'Item price' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: 'Item image URL' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ 
    description: 'Item effects', 
    type: 'object',
    additionalProperties: true,
    default: {}
  })
  @IsOptional()
  effects?: Record<string, any>;
} 