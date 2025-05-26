import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { MagicType } from '../../database/enums/magic-type.enum';
import { EffectType } from '../../database/enums/effects/effect-type.enum';
import { EffectTarget } from '../../database/enums/effects/effect-target.enum';
import { StatType } from '../../database/enums/effects/effec-stat-type.enum';
import { Type } from 'class-transformer';

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

export class UpdateSkillDto {
  @ApiProperty({ description: 'Skill name', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Skill description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    description: 'Magic type', 
    enum: MagicType,
    example: MagicType.FIRE
  })
  @IsEnum(MagicType)
  @IsOptional()
  magicType?: MagicType;

  @ApiProperty({ description: 'Base damage of the skill', required: false })
  @IsNumber()
  @IsOptional()
  baseDamage?: number;

  @ApiProperty({ description: 'Base mana cost' })
  @IsNumber()
  @IsOptional()
  baseManaCost?: number;

  @ApiProperty({ description: 'Required strength' })
  @IsNumber()
  @IsOptional()
  requiredStrength?: number;

  @ApiProperty({ description: 'Required dexterity' })
  @IsNumber()
  @IsOptional()
  requiredDexterity?: number;

  @ApiProperty({ description: 'Required intelligence' })
  @IsNumber()
  @IsOptional()
  requiredIntelligence?: number;

  @ApiProperty({ description: 'Skill price' })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ description: 'Skill image URL', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ type: [EffectDto], description: 'Effects of the skill', required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EffectDto)
  @IsOptional()
  effects?: EffectDto[];
} 