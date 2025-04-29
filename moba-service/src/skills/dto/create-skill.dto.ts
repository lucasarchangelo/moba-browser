import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({ description: 'The name of the skill', example: 'Fireball' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The description of the skill', example: 'Launches a ball of fire that deals damage to enemies' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The base damage of the skill', example: 100 })
  @IsNumber()
  @Min(0)
  baseDamage: number;

  @ApiProperty({ description: 'The base cooldown of the skill in seconds', example: 5 })
  @IsNumber()
  @Min(0)
  baseCooldown: number;

  @ApiProperty({ description: 'The base mana cost of the skill', example: 50 })
  @IsNumber()
  @Min(0)
  baseManaCost: number;

  @ApiProperty({ description: 'The base range of the skill', example: 500 })
  @IsNumber()
  @Min(0)
  baseRange: number;

  @ApiProperty({ description: 'The base area of effect of the skill', example: 100 })
  @IsNumber()
  @Min(0)
  baseAreaOfEffect: number;
}
