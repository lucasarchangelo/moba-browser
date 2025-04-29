import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillResponseDto } from './dto/skill-response.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';

@ApiTags('skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @Roles(Role.ADMIN)
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
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Get all skills' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Return all skills.', 
    type: [SkillResponseDto] 
  })
  findAll(): Promise<SkillResponseDto[]> {
    return this.skillsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.USER)
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
  findOne(@Param('id') id: string): Promise<SkillResponseDto> {
    return this.skillsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
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
  @Roles(Role.ADMIN)
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
  remove(@Param('id') id: string): Promise<void> {
    return this.skillsService.remove(id);
  }
} 