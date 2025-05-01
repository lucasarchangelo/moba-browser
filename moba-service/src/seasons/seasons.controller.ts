import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SeasonsService } from './seasons.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { SeasonResponseDto } from './dto/season-response.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../database/enums/user-role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';

@ApiTags('seasons')
@Controller('seasons')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new season' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'The season has been successfully created.', 
    type: SeasonResponseDto 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data or there is already an active season.' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Only administrators can create seasons.' 
  })
  create(@Body() createSeasonDto: CreateSeasonDto): Promise<SeasonResponseDto> {
    return this.seasonsService.create(createSeasonDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all seasons' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Return all seasons.', 
    type: [SeasonResponseDto] 
  })
  findAll(): Promise<SeasonResponseDto[]> {
    return this.seasonsService.findAll();
  }

  @Get('active')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the active season' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Return the active season.', 
    type: SeasonResponseDto 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'No active season found.' 
  })
  findActive(): Promise<SeasonResponseDto> {
    return this.seasonsService.findActiveSeason();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a season by id' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Return the season.', 
    type: SeasonResponseDto 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Season not found.' 
  })
  findOne(@Param('id') id: string): Promise<SeasonResponseDto> {
    return this.seasonsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a season' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'The season has been successfully updated.', 
    type: SeasonResponseDto 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Season not found.' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data or there is already an active season.' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Only administrators can update seasons.' 
  })
  update(
    @Param('id') id: string, 
    @Body() updateSeasonDto: UpdateSeasonDto
  ): Promise<SeasonResponseDto> {
    return this.seasonsService.update(id, updateSeasonDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a season' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The season has been successfully deleted.' })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Season not found.' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Only administrators can delete seasons.' 
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.seasonsService.remove(id);
  }
} 