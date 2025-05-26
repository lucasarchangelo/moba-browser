import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsEnum, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemSlotType } from 'src/database/enums/item-slot-type.enum';
import { EffectType } from 'src/database/enums/effects/effect-type.enum';
import { EffectTarget } from 'src/database/enums/effects/effect-target.enum';
import { Type } from 'class-transformer';
import { StatType } from 'src/database/enums/effects/effec-stat-type.enum';

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

  @ApiProperty({ type: [EffectDto], description: 'Effects of the item' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EffectDto)
  @IsOptional()
  effects?: EffectDto[];
} 