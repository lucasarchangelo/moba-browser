import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from '../database/entity/skill.entity';
import { SkillResponseDto } from './dto/skill-response.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';
import { SkillFilterDto } from './dto/skill-filter.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepository.create({
      ...createSkillDto,
      effects: createSkillDto.effects || {},
    });
    return this.skillRepository.save(skill);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResponseDto<Skill>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [skills, total] = await this.skillRepository.findAndCount({
      skip,
      take: limit,
    });

    return new PaginatedResponseDto(skills, total, page, limit);
  }

  async findOne(id: string): Promise<Skill> {
    const skill = await this.skillRepository.findOne({ where: { id } });
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return skill;
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const skill = await this.findOne(id);
    
    const updateData = {
      ...(updateSkillDto.name && { name: updateSkillDto.name }),
      ...(updateSkillDto.description && { description: updateSkillDto.description }),
      ...(updateSkillDto.magicType && { magicType: updateSkillDto.magicType }),
      ...(updateSkillDto.baseDamage !== undefined && { baseDamage: updateSkillDto.baseDamage }),
      ...(updateSkillDto.baseManaCost !== undefined && { baseManaCost: updateSkillDto.baseManaCost }),
      ...(updateSkillDto.requiredStrength !== undefined && { requiredStrength: updateSkillDto.requiredStrength }),
      ...(updateSkillDto.requiredDexterity !== undefined && { requiredDexterity: updateSkillDto.requiredDexterity }),
      ...(updateSkillDto.requiredIntelligence !== undefined && { requiredIntelligence: updateSkillDto.requiredIntelligence }),
      ...(updateSkillDto.price !== undefined && { price: updateSkillDto.price }),
      ...(updateSkillDto.imageUrl && { imageUrl: updateSkillDto.imageUrl }),
      ...(updateSkillDto.effects && { effects: updateSkillDto.effects }),
    };
    
    Object.assign(skill, updateData);
    return this.skillRepository.save(skill);
  }

  async remove(id: string): Promise<Skill> {
    const skill = await this.findOne(id);
    return this.skillRepository.remove(skill);
  }

  private mapToResponseDto(skill: Skill): SkillResponseDto {
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
      effects: skill.effects,
      createdAt: skill.createdAt,
      updatedAt: skill.updatedAt,
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