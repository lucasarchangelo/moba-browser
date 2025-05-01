import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { MagicType } from '../../database/enums/magic-type.enum';

export class CreateSkillDto {
  @ApiProperty({ description: 'Skill name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Skill description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ 
    description: 'Magic type', 
    enum: MagicType,
    example: MagicType.FIRE
  })
  @IsEnum(MagicType)
  @IsNotEmpty()
  magicType: MagicType;

  @ApiProperty({ description: 'Base damage', default: 0 })
  @IsNumber()
  @IsOptional()
  baseDamage?: number;

  @ApiProperty({ description: 'Base mana cost', default: 0 })
  @IsNumber()
  @IsOptional()
  baseManaCost?: number;

  @ApiProperty({ description: 'Required strength', default: 0 })
  @IsNumber()
  @IsOptional()
  requiredStrength?: number;

  @ApiProperty({ description: 'Required dexterity', default: 0 })
  @IsNumber()
  @IsOptional()
  requiredDexterity?: number;

  @ApiProperty({ description: 'Required intelligence', default: 0 })
  @IsNumber()
  @IsOptional()
  requiredIntelligence?: number;

  @ApiProperty({ description: 'Skill price', default: 0 })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ description: 'Skill image URL' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ 
    description: 'Skill effects', 
    type: 'object',
    additionalProperties: true,
    default: {}
  })
  @IsOptional()
  effects?: Record<string, any>;
}
