import { ApiProperty } from '@nestjs/swagger';
import { ActiveHeroDto } from './active-hero.dto';
import { SeasonResponseDto } from '../../seasons/dto/season-response.dto';

export class ActiveHeroWithSeasonDto {
  @ApiProperty({ description: 'The active hero information', type: ActiveHeroDto })
  hero: ActiveHeroDto;

  @ApiProperty({ description: 'The current season information', type: SeasonResponseDto })
  season: SeasonResponseDto;
} 