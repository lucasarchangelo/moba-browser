import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from '../database/entity/hero.entity';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { HeroResponseDto } from './dto/hero-response.dto';
import { User } from '../database/entity/user.entity';
import { Season } from '../database/entity/season.entity';
import { DistributePointsDto } from './dto/distribute-points.dto';
import { ActiveHeroDto } from './dto/active-hero.dto';
import { SeasonsService } from '../seasons/seasons.service';

@Injectable()
export class HeroesService {
  constructor(
    @InjectRepository(Hero)
    private readonly heroRepository: Repository<Hero>,
    private readonly seasonsService: SeasonsService,
  ) {}

  private calculateBaseHealth(level: number, strength: number): number {
    return (10 * level) + Math.floor(strength / 5);
  }

  private calculateBaseMana(level: number, intelligence: number): number {
    return (5 * level) + Math.floor(intelligence / 5);
  }

  private calculateBaseArmor(strength: number): number {
    return Math.floor(strength / 5);
  }

  private calculateBaseMagicResistance(intelligence: number): number {
    return Math.floor(intelligence / 5);
  }

  private calculateBaseAccuracy(dexterity: number): number {
    return Math.floor(dexterity / 5);
  }

  private calculateBaseDamage(level: number, strength: number, dexterity: number): number {
    return (5 * level) + Math.floor(strength / 10) + Math.floor(dexterity / 10);
  }

  private calculateBaseMagicDamage(level: number, intelligence: number, dexterity: number): number {
    return (5 * level) + Math.floor(intelligence / 10) + Math.floor(dexterity / 10);
  }

  private calculateDerivedStats(hero: Hero) {
    const baseHealth = this.calculateBaseHealth(hero.level, hero.strength);
    const baseMana = this.calculateBaseMana(hero.level, hero.intelligence);
    
    return {
      baseHealth,
      baseMana,
      baseArmor: this.calculateBaseArmor(hero.strength),
      baseMagicResistance: this.calculateBaseMagicResistance(hero.intelligence),
      baseAccuracy: this.calculateBaseAccuracy(hero.dexterity),
      baseDamage: this.calculateBaseDamage(hero.level, hero.strength, hero.dexterity),
      baseMagicDamage: this.calculateBaseMagicDamage(hero.level, hero.intelligence, hero.dexterity),
      currentLife: hero.currentLife || baseHealth,
      currentMana: hero.currentMana || baseMana,
    };
  }

  async create(createHeroDto: CreateHeroDto, userId: string, seasonId: string) {
    // Create hero with default values
    
    const hero = this.heroRepository.create({
      name: createHeroDto.name,
      description: createHeroDto.description || '',
      level: 1,
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      currentLife: 0,
      currentMana: 0,
      userId,
      seasonId,
    });

    // Save the hero first to get the ID
    const savedHero = await this.heroRepository.save(hero);

    // Distribute initial points
    const distributePointsDto = {
      strength: createHeroDto.strength,
      dexterity: createHeroDto.dexterity,
      intelligence: createHeroDto.intelligence,
    };

    // Use distributePoints to set initial attributes
    await this.distributePoints(savedHero.id, distributePointsDto, userId);

    // Return the updated hero
    return this.findOne(savedHero.id);
  }

  async findAll() {
    return this.heroRepository.find();
  }

  async findOne(id: string) {
    const hero = await this.heroRepository.findOne({ where: { id } });
    if (!hero) {
      throw new NotFoundException(`Hero with ID ${id} not found`);
    }
    return hero;
  }

  async update(id: string, updateHeroDto: UpdateHeroDto, userId: string) {
    const hero = await this.findOne(id);
    
    // Check if user is the owner of the hero
    if (hero.userId !== userId) {
      throw new ForbiddenException('You can only update your own heroes');
    }

    Object.assign(hero, updateHeroDto);
    return this.heroRepository.save(hero);
  }

  async remove(id: string) {
    const hero = await this.findOne(id);
    return this.heroRepository.remove(hero);
  }

  async distributePoints(id: string, distributePointsDto: DistributePointsDto, userId: string) {
    const hero = await this.findOne(id);
    
    // Check if user is the owner of the hero
    if (hero.userId !== userId) {
      throw new ForbiddenException('You can only distribute points to your own heroes');
    }

    // Calculate total points to distribute
    const totalPoints = distributePointsDto.strength + 
                       distributePointsDto.dexterity + 
                       distributePointsDto.intelligence;

    // Calculate available points (5 points per level)
    const availablePoints = hero.level * 5;
    const usedPoints = hero.strength + hero.dexterity + hero.intelligence;

    if (totalPoints > (availablePoints - usedPoints)) {
      throw new ForbiddenException('Not enough points available');
    }

    // Update hero attributes
    hero.strength += distributePointsDto.strength;
    hero.dexterity += distributePointsDto.dexterity;
    hero.intelligence += distributePointsDto.intelligence;

    return this.heroRepository.save(hero);
  }

  private mapToResponseDto(hero: Hero): HeroResponseDto {
    const derivedStats = this.calculateDerivedStats(hero);
    
    return {
      id: hero.id,
      name: hero.name,
      description: hero.description,
      level: hero.level,
      attributes: {
        strength: hero.strength,
        dexterity: hero.dexterity,
        intelligence: hero.intelligence,
        baseHealth: derivedStats.baseHealth,
        baseMana: derivedStats.baseMana,
        baseArmor: derivedStats.baseArmor,
        baseMagicResistance: derivedStats.baseMagicResistance,
        baseAccuracy: derivedStats.baseAccuracy,
        baseDamage: derivedStats.baseDamage,
        baseMagicDamage: derivedStats.baseMagicDamage,
        currentLife: derivedStats.currentLife,
        currentMana: derivedStats.currentMana,
      },
      userId: hero.userId,
      seasonId: hero.seasonId,
      createdAt: hero.createdAt,
      updatedAt: hero.updatedAt,
    };
  }

  async findActiveHero(userId: string): Promise<ActiveHeroDto> {
    // Find the active season
    const activeSeason = await this.seasonsService.findActiveSeason();
    if (!activeSeason) {
      throw new NotFoundException('No active season found');
    }

    // Find the hero for this user in the active season
    const hero = await this.heroRepository.findOne({
      where: {
        userId,
        seasonId: activeSeason.id,
      },
    });

    if (!hero) {
      throw new NotFoundException('No active hero found for the current season');
    }

    // Convert to DTO and add isActive flag
    const heroDto = this.mapToResponseDto(hero);
    return {
      ...heroDto,
      isActive: true,
    };
  }
} 