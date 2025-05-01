import { ApiProperty } from '@nestjs/swagger';
import { MagicType } from '../../database/enums/magic-type.enum';

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

  @ApiProperty({ 
    description: 'Skill effects', 
    type: 'object',
    additionalProperties: true
  })
  effects: Record<string, any>;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
} 