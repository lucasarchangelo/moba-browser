import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSeasonDto {
  @ApiProperty({ description: 'Season name', example: 'Season 1' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Season start date', example: '2024-01-01T00:00:00Z' })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @ApiProperty({ description: 'Season end date', example: '2024-12-31T23:59:59Z' })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @ApiProperty({ description: 'Whether the season is active' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
} 