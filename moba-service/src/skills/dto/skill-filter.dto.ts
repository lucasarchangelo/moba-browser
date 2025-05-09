import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SkillFilterDto {
  @ApiPropertyOptional({ description: 'Maximum required strength' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  maxRequiredStrength?: number;

  @ApiPropertyOptional({ description: 'Maximum required dexterity' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  maxRequiredDexterity?: number;

  @ApiPropertyOptional({ description: 'Maximum required intelligence' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  maxRequiredIntelligence?: number;
} 