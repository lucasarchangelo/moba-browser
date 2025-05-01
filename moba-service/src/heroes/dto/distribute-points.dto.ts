import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max, IsInt } from 'class-validator';

export class DistributePointsDto {
  @ApiProperty({ description: 'Points to add to strength', minimum: 0 })
  @IsNumber()
  @IsInt()
  @Min(0)
  strength: number;

  @ApiProperty({ description: 'Points to add to dexterity', minimum: 0 })
  @IsNumber()
  @IsInt()
  @Min(0)
  dexterity: number;

  @ApiProperty({ description: 'Points to add to intelligence', minimum: 0 })
  @IsNumber()
  @IsInt()
  @Min(0)
  intelligence: number;
} 