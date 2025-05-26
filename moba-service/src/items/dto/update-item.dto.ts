import { IsString, IsNumber, IsEnum, IsBoolean, IsOptional, IsUrl, Min, IsObject, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemSlotType } from 'src/database/enums/item-slot-type.enum';
import { EffectType } from 'src/database/enums/effects/effect-type.enum';
import { StatType } from 'src/database/enums/effects/effec-stat-type.enum';
import { EffectTarget } from 'src/database/enums/effects/effect-target.enum';
import { Type } from 'class-transformer';

class EffectDto {
  @ApiProperty({ enum: EffectType, description: 'Type of effect' })
  @IsEnum(EffectType)
  type: EffectType;

  @ApiProperty({ enum: EffectTarget, description: 'Target of the effect' })
  @IsEnum(EffectTarget)
  target: EffectTarget;

  @ApiProperty({ enum: StatType, description: 'Stat affected by the effect' })
  @IsEnum(StatType)
  stat: StatType;

  @ApiProperty({ description: 'Value of the effect' })
  @IsNumber()
  value: number;

  @ApiProperty({ description: 'Duration of the effect in seconds (0 for permanent)', required: false })
  @IsNumber()
  @IsOptional()
  duration?: number;
}

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

  @ApiProperty({ type: [EffectDto], description: 'Effects of the item', required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EffectDto)
  @IsOptional()
  effects?: EffectDto[];
} 