import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from '../database/entity/skill.entity';
import { SkillResponseDto } from './dto/skill-response.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';
import { SkillFilterDto } from './dto/skill-filter.dto';
import { ILogger } from '../core/logger/logger.interface';
import { EffectDto } from 'src/items/dto/item-response.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<SkillResponseDto> {
    const skill = this.skillRepository.create({
      ...createSkillDto,
      effects: createSkillDto.effects || []
    });
    const savedSkill = await this.skillRepository.save(skill);
    return this.mapToResponseDto(savedSkill);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResponseDto<SkillResponseDto>> {
    const { page = 1, limit = 10 } = paginationDto;
    const [skills, total] = await this.skillRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: skills.map(skill => this.mapToResponseDto(skill)),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
    };
  }

  async findOne(id: string): Promise<SkillResponseDto> {
    const skill = await this.skillRepository.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return this.mapToResponseDto(skill);
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<SkillResponseDto> {
    const skill = await this.skillRepository.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }

    const updatedSkill = await this.skillRepository.save({
      ...skill,
      ...updateSkillDto,
      effects: updateSkillDto.effects || skill.effects
    });

    return this.mapToResponseDto(updatedSkill);
  }

  async remove(id: string): Promise<void> {
    const result = await this.skillRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
  }

  private mapToResponseDto(skill: Skill): SkillResponseDto {
    let effects: EffectDto[] = [];

    if (skill.effects && Object.keys(skill.effects).length > 0) {
      effects = skill.effects?.map(effect => ({
        type: effect.type,
        target: effect.target,
        stat: effect.stat,
        value: typeof effect.value === 'string' ? parseFloat(effect.value) : effect.value,
        duration: effect.duration,
        chance: effect.chance
      })) || []
    }
    
    return {
      id: skill.id,
      name: skill.name,
      description: skill.description,
      magicType: skill.magicType,
      baseDamage: skill.baseDamage,
      baseManaCost: skill.baseManaCost,
      requiredStrength: skill.requiredStrength,
      requiredDexterity: skill.requiredDexterity,
      requiredIntelligence: skill.requiredIntelligence,
      price: skill.price,
      imageUrl: skill.imageUrl,
      effects: effects,
      createdAt: skill.createdAt,
      updatedAt: skill.updatedAt
    };
  }

  async getSkills(
    paginationDto: PaginationDto,
    filterDto?: SkillFilterDto
  ): Promise<{ data: SkillResponseDto[]; meta: { total: number; page: number; limit: number; totalPages: number } }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    // Create query builder for more complex filtering
    const queryBuilder = this.skillRepository.createQueryBuilder('skill');

    // Apply filters if they exist
    if (filterDto) {
      if (filterDto.maxRequiredStrength !== undefined) {
        queryBuilder.andWhere('skill.requiredStrength <= :maxStrength', { 
          maxStrength: filterDto.maxRequiredStrength 
        });
      }
      if (filterDto.maxRequiredDexterity !== undefined) {
        queryBuilder.andWhere('skill.requiredDexterity <= :maxDexterity', { 
          maxDexterity: filterDto.maxRequiredDexterity 
        });
      }
      if (filterDto.maxRequiredIntelligence !== undefined) {
        queryBuilder.andWhere('skill.requiredIntelligence <= :maxIntelligence', { 
          maxIntelligence: filterDto.maxRequiredIntelligence 
        });
      }
    }

    // Add pagination
    queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy('skill.createdAt', 'DESC');

    // Get total count for pagination
    const total = await queryBuilder.getCount();

    // Get the skills
    const skills = await queryBuilder.getMany();

    const totalPages = Math.ceil(total / limit);

    return {
      data: skills.map(skill => this.mapToResponseDto(skill)),
      meta: {
        total,
        page,
        limit,
        totalPages,
      }
    };
  }
} 