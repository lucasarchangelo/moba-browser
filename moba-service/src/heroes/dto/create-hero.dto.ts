import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Max, IsInt } from 'class-validator';

export class CreateHeroDto {
  @ApiProperty({ description: 'Hero name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Hero description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Hero image URL', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'Initial strength points (1-5)', minimum: 1, maximum: 5 })
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(5)
  strength: number;

  @ApiProperty({ description: 'Initial dexterity points (1-5)', minimum: 1, maximum: 5 })
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(5)
  dexterity: number;

  @ApiProperty({ description: 'Initial intelligence points (1-5)', minimum: 1, maximum: 5 })
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(5)
  intelligence: number;
} 