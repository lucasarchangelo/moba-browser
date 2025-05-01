import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from '../database/entity/skill.entity';
import { SkillResponseDto } from './dto/skill-response.dto';

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

  async findAll(): Promise<Skill[]> {
    return this.skillRepository.find();
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
} 