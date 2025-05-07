import { ApiProperty } from '@nestjs/swagger';
import { HeroResponseDto } from './hero-response.dto';

export class ActiveHeroDto extends HeroResponseDto {
  @ApiProperty({ description: 'Whether this hero is active in the current season' })
  isActive: boolean;
} 