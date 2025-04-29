import { ApiProperty } from '@nestjs/swagger';

export class SkillResponseDto {
  @ApiProperty({ description: 'The unique identifier of the skill', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ description: 'The name of the skill', example: 'Fireball' })
  name: string;

  @ApiProperty({ description: 'The description of the skill', example: 'Launches a ball of fire that deals damage to enemies' })
  description: string;

  @ApiProperty({ description: 'The base damage of the skill', example: 100 })
  baseDamage: number;

  @ApiProperty({ description: 'The base cooldown of the skill in seconds', example: 5 })
  baseCooldown: number;

  @ApiProperty({ description: 'The base mana cost of the skill', example: 50 })
  baseManaCost: number;

  @ApiProperty({ description: 'The base range of the skill', example: 500 })
  baseRange: number;

  @ApiProperty({ description: 'The base area of effect of the skill', example: 100 })
  baseAreaOfEffect: number;

  @ApiProperty({ description: 'The date when the skill was created', example: '2024-04-29T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ description: 'The date when the skill was last updated', example: '2024-04-29T12:00:00Z' })
  updatedAt: Date;
} 