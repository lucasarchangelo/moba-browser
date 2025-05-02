import { ApiProperty } from '@nestjs/swagger';
import { HeroResponseDto } from './hero-response.dto';

export class ActiveHeroDto extends HeroResponseDto {
  @ApiProperty({ description: 'Whether this is the active hero for the current season' })
  isActive: boolean;
} 