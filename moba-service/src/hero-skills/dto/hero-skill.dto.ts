import { ApiProperty } from '@nestjs/swagger';
import { MagicType } from '../../database/enums/magic-type.enum';

export class HeroSkillDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  level: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  skill: {
    id: string;
    name: string;
    description: string;
    magicType: MagicType;
    baseDamage: number;
    baseManaCost: number;
    requiredStrength: number;
    requiredDexterity: number;
    requiredIntelligence: number;
    price: number;
    imageUrl: string;
    effects: Record<string, any>;
  };
} 