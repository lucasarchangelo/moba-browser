import { ApiProperty } from '@nestjs/swagger';
import { HeroType } from '../../database/enums/hero-type.enum';

class HeroAttributeResponseDto {
  @ApiProperty({ description: 'Hero damage value' })
  damage: number;

  @ApiProperty({ description: 'Hero armor value' })
  armor: number;

  @ApiProperty({ description: 'Hero magic resistance value' })
  magicResistance: number;

  @ApiProperty({ description: 'Hero health value' })
  health: number;

  @ApiProperty({ description: 'Hero mana value' })
  mana: number;

  @ApiProperty({ description: 'Hero strength value' })
  strength: number;

  @ApiProperty({ description: 'Hero agility value' })
  agility: number;

  @ApiProperty({ description: 'Hero intelligence value' })
  intelligence: number;
}

class HeroSkillResponseDto {
  @ApiProperty({ description: 'Skill ID' })
  id: string;

  @ApiProperty({ description: 'Skill name' })
  name: string;

  @ApiProperty({ description: 'Skill description' })
  description: string;

  @ApiProperty({ description: 'Skill type' })
  type: string;

  @ApiProperty({ description: 'Skill effects' })
  effects: any;

  @ApiProperty({ description: 'Skill image URL' })
  imageUrl: string;
}

export class HeroResponseDto {
  @ApiProperty({ description: 'Hero ID' })
  id: string;

  @ApiProperty({ description: 'Hero name' })
  name: string;

  @ApiProperty({ description: 'Hero description' })
  description: string;

  @ApiProperty({ 
    description: 'Hero type', 
    enum: HeroType,
    example: HeroType.KNIGHT
  })
  type: HeroType;

  @ApiProperty({ description: 'Hero image URL' })
  imageUrl: string;

  @ApiProperty({ description: 'Hero attributes', type: HeroAttributeResponseDto })
  attributes: HeroAttributeResponseDto;

  @ApiProperty({ description: 'Hero skills', type: [HeroSkillResponseDto] })
  skills: HeroSkillResponseDto[];

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;
} 