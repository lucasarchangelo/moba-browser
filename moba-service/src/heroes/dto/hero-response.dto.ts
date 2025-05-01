import { ApiProperty } from '@nestjs/swagger';

export class HeroResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  level: number;

  @ApiProperty()
  attributes: {
    strength: number;
    dexterity: number;
    intelligence: number;
    baseHealth: number;
    baseMana: number;
    baseArmor: number;
    baseMagicResistance: number;
    baseAccuracy: number;
    baseDamage: number;
    baseMagicDamage: number;
    currentLife: number;
    currentMana: number;
  };

  @ApiProperty()
  userId: string;

  @ApiProperty()
  seasonId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
} 