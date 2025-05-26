import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsEnum, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { MagicType } from '../../database/enums/magic-type.enum';
import { EffectType } from '../../database/enums/effects/effect-type.enum';
import { EffectTarget } from '../../database/enums/effects/effect-target.enum';
import { StatType } from '../../database/enums/effects/effec-stat-type.enum';

class EffectDto {
  @ApiProperty({ enum: EffectType, description: 'Type of effect' })
  @IsEnum(EffectType)
  type: EffectType;

  @ApiProperty({ enum: EffectTarget, description: 'Target of the effect' })
  @IsEnum(EffectTarget)
  target: EffectTarget;

  @ApiProperty({ enum: StatType, description: 'Stat affected by the effect', required: false })
  @IsEnum(StatType)
  @IsOptional()
  stat?: StatType;

  @ApiProperty({ description: 'Value of the effect' })
  @IsNumber()
  value: number;

  @ApiProperty({ description: 'Duration of the effect in seconds (0 for permanent)', required: false })
  @IsNumber()
  @IsOptional()
  duration?: number;

  @ApiProperty({ description: 'Chance of the effect occurring (0-100)', required: false })
  @IsNumber()
  @IsOptional()
  chance?: number;
}

export class CreateSkillDto {
  @ApiProperty({ description: 'Skill name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Skill description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ 
    description: 'Magic type', 
    enum: MagicType,
    example: MagicType.FIRE
  })
  @IsEnum(MagicType)
  @IsNotEmpty()
  magicType: MagicType;

  @ApiProperty({ description: 'Base damage', default: 0 })
  @IsNumber()
  @IsOptional()
  baseDamage?: number;

  @ApiProperty({ description: 'Base mana cost', default: 0 })
  @IsNumber()
  @IsOptional()
  baseManaCost?: number;

  @ApiProperty({ description: 'Required strength', default: 0 })
  @IsNumber()
  @IsOptional()
  requiredStrength?: number;

  @ApiProperty({ description: 'Required dexterity', default: 0 })
  @IsNumber()
  @IsOptional()
  requiredDexterity?: number;

  @ApiProperty({ description: 'Required intelligence', default: 0 })
  @IsNumber()
  @IsOptional()
  requiredIntelligence?: number;

  @ApiProperty({ description: 'Skill price', default: 0 })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ description: 'Skill image URL' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ type: [EffectDto], description: 'Effects of the skill' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EffectDto)
  @IsOptional()
  effects?: EffectDto[];
}
