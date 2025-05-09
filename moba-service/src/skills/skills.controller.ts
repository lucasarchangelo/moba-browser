import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillResponseDto } from './dto/skill-response.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/database/enums/user-role.enum';
import { Skill } from '../database/entity/skill.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SkillFilterDto } from './dto/skill-filter.dto';

@ApiTags('skills')
@Controller('skills')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new skill' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'The skill has been successfully created.', 
    type: SkillResponseDto 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data.' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Only administrators can create items.' 
  })
  create(@Body() createSkillDto: CreateSkillDto): Promise<SkillResponseDto> {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  @Roles(UserRole.USER)
  @ApiOperation({ summary: 'Get all skills with optional filtering' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns paginated list of skills',
    type: [SkillResponseDto]
  })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query() filterDto: SkillFilterDto
  ) {
    return this.skillsService.getSkills(paginationDto, filterDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({ summary: 'Get a skill by id' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Return the skill.', 
    type: SkillResponseDto 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Item not found.' 
  })
  async findOne(@Param('id') id: string): Promise<Skill> {
    return this.skillsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a skill' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'The skill has been successfully updated.', 
    type: SkillResponseDto 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Skill not found.' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data.' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Only administrators can update skills.' 
  })
  update(
    @Param('id') id: string, 
    @Body() updateSkillDto: UpdateSkillDto
  ): Promise<SkillResponseDto> {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a skill' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The skill has been successfully deleted.' })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Skill not found.' 
  })
  @ApiResponse({ 
    status: HttpStatus.FORBIDDEN, 
    description: 'Only administrators can delete skills.' 
  })
  remove(@Param('id') id: string): Promise<SkillResponseDto> {
    return this.skillsService.remove(id);
  }
} 