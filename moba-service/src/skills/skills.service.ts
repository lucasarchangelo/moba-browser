import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from '../database/entity/skill.entity';
import { ILogger, ILoggerMetadata } from '../core/logger/logger.interface';
import { Inject } from '@nestjs/common';

@Injectable()
export class SkillsService {
  private readonly metadata: ILoggerMetadata = {
    service: 'SkillsService',
  };

  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {}

  async create(createSkillDto: CreateSkillDto) {
    this.logger.debug('Creating new skill', this.metadata);
    const skill = this.skillRepository.create(createSkillDto);
    const result = await this.skillRepository.save(skill);
    this.logger.info(`Skill created with id: ${result.id}`, this.metadata);
    return result;
  }

  async findAll() {
    this.logger.debug('Finding all skills', this.metadata);
    const skills = await this.skillRepository.find();
    this.logger.info(`Found ${skills.length} skills`, this.metadata);
    return skills;
  }

  async findOne(id: string) {
    this.logger.debug(`Finding skill with id: ${id}`, this.metadata);
    const skill = await this.skillRepository.findOneBy({ id });
    if (!skill) {
      this.logger.warn(`Skill not found with id: ${id}`, this.metadata);
    } else {
      this.logger.info(`Skill found with id: ${id}`, this.metadata);
    }
    return skill;
  }

  async update(id: string, updateSkillDto: UpdateSkillDto) {
    this.logger.debug(`Updating skill with id: ${id}`, this.metadata);
    const skill = await this.findOne(id);
    if (!skill) {
      this.logger.warn(`Cannot update skill: Skill not found with id: ${id}`, this.metadata);
      return null;
    }
    await this.skillRepository.update(id, updateSkillDto);
    const updatedSkill = await this.findOne(id);
    this.logger.info(`Skill updated with id: ${id}`, this.metadata);
    return updatedSkill;
  }

  async remove(id: string): Promise<void> {
    this.logger.debug(`Removing skill with id: ${id}`, this.metadata);
    const skill = await this.findOne(id);
    if (!skill) {
      this.logger.warn(`Cannot remove skill: Skill not found with id: ${id}`, this.metadata);
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    const result = await this.skillRepository.remove(skill);
    this.logger.info(`Skill removed with id: ${id}`, this.metadata);
  } 
} 