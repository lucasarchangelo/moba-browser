import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../database/enums/user-role.enum';
import { HeroSkillsService } from './hero-skills.service';
import { HeroSkillDto } from './dto/hero-skill.dto';

@ApiTags('hero-skills')
@Controller('hero-skills')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class HeroSkillsController {
  constructor(private readonly heroSkillsService: HeroSkillsService) {}

  @Get()
  @Roles(UserRole.USER)
  @ApiOperation({ summary: 'Get all skills for the current hero' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns all skills owned by the current hero',
    type: [HeroSkillDto]
  })
  @ApiResponse({ status: 400, description: 'User needs an active hero in the current season' })
  @ApiResponse({ status: 404, description: 'No active season found' })
  async getHeroSkills(@Request() req): Promise<HeroSkillDto[]> {
    return this.heroSkillsService.getHeroSkills(req.user.id);
  }
} 