import { ApiProperty } from '@nestjs/swagger';
import { MagicType } from '../../database/enums/magic-type.enum';
import { EffectType } from '../../database/enums/effects/effect-type.enum';
import { EffectTarget } from '../../database/enums/effects/effect-target.enum';
import { StatType } from '../../database/enums/effects/effec-stat-type.enum';

class EffectDto {
  @ApiProperty({ enum: EffectType, description: 'Type of effect' })
  type: EffectType;

  @ApiProperty({ enum: EffectTarget, description: 'Target of the effect' })
  target: EffectTarget;

  @ApiProperty({ enum: StatType, description: 'Stat affected by the effect', required: false })
  stat?: StatType;

  @ApiProperty({ description: 'Value of the effect' })
  value: number;

  @ApiProperty({ description: 'Duration of the effect in seconds (0 for permanent)', required: false })
  duration?: number;

  @ApiProperty({ description: 'Chance of the effect occurring (0-100)', required: false })
  chance?: number;
}

export class SkillResponseDto {
  @ApiProperty({ description: 'Skill ID' })
  id: string;

  @ApiProperty({ description: 'Skill name' })
  name: string;

  @ApiProperty({ description: 'Skill description' })
  description: string;

  @ApiProperty({ 
    description: 'Magic type', 
    enum: MagicType,
    example: MagicType.FIRE
  })
  magicType: MagicType;

  @ApiProperty({ description: 'Base damage' })
  baseDamage: number;

  @ApiProperty({ description: 'Base mana cost' })
  baseManaCost: number;

  @ApiProperty({ description: 'Required strength' })
  requiredStrength: number;

  @ApiProperty({ description: 'Required dexterity' })
  requiredDexterity: number;

  @ApiProperty({ description: 'Required intelligence' })
  requiredIntelligence: number;

  @ApiProperty({ description: 'Skill price' })
  price: number;

  @ApiProperty({ description: 'Skill image URL' })
  imageUrl: string;

  @ApiProperty({ type: [EffectDto], description: 'Effects of the skill' })
  effects: EffectDto[];

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
} 