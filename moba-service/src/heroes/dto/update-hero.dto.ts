import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber, IsObject, IsOptional, IsEnum } from 'class-validator';
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

export class UpdateHeroDto extends PartialType(CreateHeroDto) {
  @ApiPropertyOptional({ description: 'Hero name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Hero description' })
  @IsString()
  @IsOptional()
  description?: string;

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

  @ApiPropertyOptional({ description: 'Hero image URL' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({ description: 'Hero attributes' })
  @IsObject()
  @ValidateNested()
  @Type(() => CreateHeroDto.prototype.attributes.constructor)
  @IsOptional()
  attributes?: CreateHeroDto['attributes'];

  @ApiPropertyOptional({ description: 'Hero skills' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHeroDto.prototype.skills[0].constructor)
  @IsOptional()
  skills?: CreateHeroDto['skills'];
} 