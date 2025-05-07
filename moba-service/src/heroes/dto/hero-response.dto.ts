import { ApiProperty } from '@nestjs/swagger';

export class HeroAttributesDto {
  @ApiProperty({ description: 'Hero strength attribute' })
  strength: number;

  @ApiProperty({ description: 'Hero dexterity attribute' })
  dexterity: number;

  @ApiProperty({ description: 'Hero intelligence attribute' })
  intelligence: number;

  @ApiProperty({ description: 'Base health calculated from level and strength' })
  baseHealth: number;

  @ApiProperty({ description: 'Base mana calculated from level and intelligence' })
  baseMana: number;

  @ApiProperty({ description: 'Base armor calculated from strength' })
  baseArmor: number;

  @ApiProperty({ description: 'Base magic resistance calculated from intelligence' })
  baseMagicResistance: number;

  @ApiProperty({ description: 'Base accuracy calculated from dexterity' })
  baseAccuracy: number;

  @ApiProperty({ description: 'Base damage calculated from level, strength and dexterity' })
  baseDamage: number;

  @ApiProperty({ description: 'Base magic damage calculated from level, intelligence and dexterity' })
  baseMagicDamage: number;

  @ApiProperty({ description: 'Current life points' })
  currentLife: number;

  @ApiProperty({ description: 'Current mana points' })
  currentMana: number;
}

export class HeroResponseDto {
  @ApiProperty({ description: 'Hero unique identifier' })
  id: string;

  @ApiProperty({ description: 'Hero name' })
  name: string;

  @ApiProperty({ description: 'Hero description' })
  description: string;

  @ApiProperty({ description: 'Hero level' })
  level: number;

  @ApiProperty({ description: 'Hero attributes and derived stats' })
  attributes: HeroAttributesDto;

  @ApiProperty({ description: 'Hero money' })
  money: number;

  @ApiProperty({ description: 'User ID who owns this hero' })
  userId: string;

  @ApiProperty({ description: 'Season ID this hero belongs to' })
  seasonId: string;

  @ApiProperty({ description: 'Hero creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Hero last update timestamp' })
  updatedAt: Date;
} 