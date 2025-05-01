import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Season } from '../database/entity/season.entity';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { SeasonResponseDto } from './dto/season-response.dto';
import { ILogger } from '../core/logger/logger.interface';
import { Inject } from '@nestjs/common';

@Injectable()
export class SeasonsService {
  private readonly serviceName = { service: 'SeasonsService' };

  constructor(
    @InjectRepository(Season)
    private readonly seasonRepository: Repository<Season>,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {}

  async create(createSeasonDto: CreateSeasonDto): Promise<Season> {
    this.logger.debug('Creating new season', this.serviceName);

    // Validate that there's no active season if this one is being set as active
    if (createSeasonDto.isActive) {
      const activeSeason = await this.findActiveSeason();
      if (activeSeason) {
        throw new BadRequestException('There is already an active season');
      }
    }

    const season = this.seasonRepository.create(createSeasonDto);
    const savedSeason = await this.seasonRepository.save(season);
    
    this.logger.info(`Season created successfully with ID: ${savedSeason.id}`, this.serviceName);
    return savedSeason;
  }

  async findAll(): Promise<Season[]> {
    this.logger.debug('Fetching all seasons', this.serviceName);
    const seasons = await this.seasonRepository.find();
    this.logger.info(`Retrieved ${seasons.length} seasons`, this.serviceName);
    return seasons;
  }

  async findOne(id: string): Promise<Season> {
    this.logger.debug(`Finding season with ID: ${id}`, this.serviceName);
    const season = await this.seasonRepository.findOne({ where: { id } });
    if (!season) {
      this.logger.warn(`Season not found with ID: ${id}`, this.serviceName);
      throw new NotFoundException(`Season with ID ${id} not found`);
    }
    this.logger.debug(`Season found with ID: ${id}`, this.serviceName);
    return season;
  }

  async findActiveSeason(): Promise<Season | null> {
    this.logger.debug('Finding active season', this.serviceName);
    const season = await this.seasonRepository.findOne({ where: { isActive: true } });
    if (!season) {
      this.logger.debug('No active season found', this.serviceName);
      return null;
    }
    this.logger.debug(`Active season found with ID: ${season.id}`, this.serviceName);
    return season;
  }

  async update(id: string, updateSeasonDto: UpdateSeasonDto): Promise<Season> {
    this.logger.debug(`Updating season with ID: ${id}`, this.serviceName);
    
    const season = await this.findOne(id);
    
    // If trying to set this season as active, ensure no other season is active
    if (updateSeasonDto.isActive === true) {
      const activeSeason = await this.findActiveSeason();
      if (activeSeason && activeSeason.id !== id) {
        throw new BadRequestException('There is already an active season');
      }
    }

    const updateData = {
      ...(updateSeasonDto.name && { name: updateSeasonDto.name }),
      ...(updateSeasonDto.startDate && { startDate: updateSeasonDto.startDate }),
      ...(updateSeasonDto.endDate && { endDate: updateSeasonDto.endDate }),
      ...(updateSeasonDto.isActive !== undefined && { isActive: updateSeasonDto.isActive }),
    };
    
    Object.assign(season, updateData);
    const updatedSeason = await this.seasonRepository.save(season);
    
    this.logger.info(`Season updated successfully with ID: ${id}`, this.serviceName);
    return updatedSeason;
  }

  async remove(id: string): Promise<void> {
    this.logger.debug(`Attempting to remove season with ID: ${id}`, this.serviceName);
    const result = await this.seasonRepository.delete(id);
    if (result.affected === 0) {
      this.logger.warn(`Season not found for deletion with ID: ${id}`, this.serviceName);
      throw new NotFoundException(`Season with ID ${id} not found`);
    }
    this.logger.info(`Season removed successfully with ID: ${id}`, this.serviceName);
  }

  private mapToResponseDto(season: Season): SeasonResponseDto {
    return {
      id: season.id,
      name: season.name,
      startDate: season.startDate,
      endDate: season.endDate,
      isActive: season.isActive,
      createdAt: season.createdAt,
      updatedAt: season.updatedAt,
    };
  }
} 