import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { MagicType } from '../../database/enums/magic-type.enum';

export class UpdateSkillDto {
  @ApiProperty({ description: 'Skill name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Skill description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    description: 'Magic type', 
    enum: MagicType,
    example: MagicType.FIRE
  })
  @IsEnum(MagicType)
  @IsOptional()
  magicType?: MagicType;

  @ApiProperty({ description: 'Base damage' })
  @IsNumber()
  @IsOptional()
  baseDamage?: number;

  @ApiProperty({ description: 'Base mana cost' })
  @IsNumber()
  @IsOptional()
  baseManaCost?: number;

  @ApiProperty({ description: 'Required strength' })
  @IsNumber()
  @IsOptional()
  requiredStrength?: number;

  @ApiProperty({ description: 'Required dexterity' })
  @IsNumber()
  @IsOptional()
  requiredDexterity?: number;

  @ApiProperty({ description: 'Required intelligence' })
  @IsNumber()
  @IsOptional()
  requiredIntelligence?: number;

  @ApiProperty({ description: 'Skill price' })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ description: 'Skill image URL' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ 
    description: 'Skill effects', 
    type: 'object',
    additionalProperties: true
  })
  @IsOptional()
  effects?: Record<string, any>;
} 