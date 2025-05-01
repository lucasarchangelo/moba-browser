import { ApiProperty } from '@nestjs/swagger';

export class SeasonResponseDto {
  @ApiProperty({ description: 'Season ID' })
  id: string;

  @ApiProperty({ description: 'Season name' })
  name: string;

  @ApiProperty({ description: 'Season start date' })
  startDate: Date;

  @ApiProperty({ description: 'Season end date' })
  endDate: Date;

  @ApiProperty({ description: 'Whether the season is active' })
  isActive: boolean;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
} 