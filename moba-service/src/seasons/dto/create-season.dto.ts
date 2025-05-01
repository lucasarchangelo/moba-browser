import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSeasonDto {
  @ApiProperty({ description: 'Season name', example: 'Season 1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Season start date', example: '2024-01-01T00:00:00Z' })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ description: 'Season end date', example: '2024-12-31T23:59:59Z' })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ description: 'Whether the season is active', default: false })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
} 