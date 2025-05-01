import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from 'src/database/enums/user-role.enum';
import { SeasonsService } from '../seasons/seasons.service';
import { DistributePointsDto } from './dto/distribute-points.dto';

@Controller('heroes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HeroesController {
  constructor(
    private readonly heroesService: HeroesService,
    private readonly seasonsService: SeasonsService,
  ) {}

  @Post()
  @Roles(UserRole.USER)
  async create(
    @Body() createHeroDto: CreateHeroDto,
    @Req() req: any,
  ) {
    const activeSeason = await this.seasonsService.findActiveSeason();
    if (!activeSeason) {
      throw new Error('No active season found');
    }
    
    return this.heroesService.create(
      createHeroDto,
      req.user.id,
      activeSeason.id,
    );
  }

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.heroesService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  findOne(@Param('id') id: string) {
    return this.heroesService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.USER, UserRole.ADMIN)
  update(
    @Param('id') id: string, 
    @Body() updateHeroDto: UpdateHeroDto,
    @Req() req: any,
  ) {
    return this.heroesService.update(id, updateHeroDto, req.user.id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.heroesService.remove(id);
  }

  @Post(':id/distribute-points')
  @Roles(UserRole.USER)
  async distributePoints(
    @Param('id') id: string,
    @Body() distributePointsDto: DistributePointsDto,
    @Req() req: any,
  ) {
    return this.heroesService.distributePoints(id, distributePointsDto, req.user.id);
  }
} 