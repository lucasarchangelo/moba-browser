import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber, IsObject, IsOptional, IsEnum, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { CreateHeroDto } from './create-hero.dto';
import { HeroType } from '../../database/enums/hero-type.enum';

class HeroAttributeDto {
  @ApiPropertyOptional({ description: 'Hero damage value' })
  @IsNumber()
  @IsOptional()
  damage?: number;

  @ApiPropertyOptional({ description: 'Hero armor value' })
  @IsNumber()
  @IsOptional()
  armor?: number;

  @ApiPropertyOptional({ description: 'Hero magic resistance value' })
  @IsNumber()
  @IsOptional()
  magicResistance?: number;

  @ApiPropertyOptional({ description: 'Hero health value' })
  @IsNumber()
  @IsOptional()
  health?: number;

  @ApiPropertyOptional({ description: 'Hero mana value' })
  @IsNumber()
  @IsOptional()
  mana?: number;

  @ApiPropertyOptional({ description: 'Hero strength value' })
  @IsNumber()
  @IsOptional()
  strength?: number;

  @ApiPropertyOptional({ description: 'Hero agility value' })
  @IsNumber()
  @IsOptional()
  agility?: number;

  @ApiPropertyOptional({ description: 'Hero intelligence value' })
  @IsNumber()
  @IsOptional()
  intelligence?: number;
}

class HeroSkillDto {
  @ApiPropertyOptional({ description: 'Skill ID' })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiPropertyOptional({ description: 'Skill name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Skill description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Skill type' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({ description: 'Skill effects' })
  @IsObject()
  @IsOptional()
  effects?: any;

  @ApiPropertyOptional({ description: 'Skill image URL' })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}

export class UpdateHeroDto {
  @ApiProperty({ description: 'Hero name', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Hero description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  level?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  strength?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  dexterity?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  intelligence?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  currentLife?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  currentMana?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  baseDamage?: number;

  @ApiPropertyOptional({ 
    description: 'Hero type', 
    enum: HeroType,
    example: HeroType.KNIGHT
  })
  @IsEnum(HeroType)
  @IsOptional()
  type?: HeroType;

  @ApiPropertyOptional({ description: 'Hero abilities' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  abilities?: string[];

  @ApiProperty({ description: 'Hero image URL', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;
} 