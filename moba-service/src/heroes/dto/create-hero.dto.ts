import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

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
} 