import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber, IsObject, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { HeroType } from '../../database/enums/hero-type.enum';

class HeroAttributeDto {
  @ApiProperty({ description: 'Hero damage value' })
  @IsNumber()
  @IsNotEmpty()
  damage: number;

  @ApiProperty({ description: 'Hero armor value' })
  @IsNumber()
  @IsNotEmpty()
  armor: number;

  @ApiProperty({ description: 'Hero magic resistance value' })
  @IsNumber()
  @IsNotEmpty()
  magicResistance: number;

  @ApiProperty({ description: 'Hero health value' })
  @IsNumber()
  @IsNotEmpty()
  health: number;

  @ApiProperty({ description: 'Hero mana value' })
  @IsNumber()
  @IsNotEmpty()
  mana: number;

  @ApiProperty({ description: 'Hero strength value' })
  @IsNumber()
  @IsNotEmpty()
  strength: number;

  @ApiProperty({ description: 'Hero agility value' })
  @IsNumber()
  @IsNotEmpty()
  agility: number;

  @ApiProperty({ description: 'Hero intelligence value' })
  @IsNumber()
  @IsNotEmpty()
  intelligence: number;
}

class HeroSkillDto {
  @ApiProperty({ description: 'Skill ID' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Skill name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Skill description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Skill type' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'Skill effects' })
  @IsObject()
  @IsNotEmpty()
  effects: any;

  @ApiProperty({ description: 'Skill image URL' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}

export class CreateHeroDto {
  @ApiProperty({ description: 'Hero name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Hero description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ 
    description: 'Hero type', 
    enum: HeroType,
    example: HeroType.KNIGHT
  })
  @IsEnum(HeroType)
  @IsNotEmpty()
  type: HeroType;

  @ApiProperty({ description: 'Hero abilities' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  abilities?: string[];

  @ApiProperty({ description: 'Hero image URL' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'Hero attributes', type: HeroAttributeDto })
  @IsObject()
  @ValidateNested()
  @Type(() => HeroAttributeDto)
  attributes: HeroAttributeDto;

  @ApiProperty({ description: 'Hero skills', type: [HeroSkillDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HeroSkillDto)
  skills: HeroSkillDto[];
} 