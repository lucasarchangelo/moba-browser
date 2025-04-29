import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from '../database/entity';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { HeroResponseDto } from './dto/hero-response.dto';

@Injectable()
export class HeroesService {
  constructor(
    @InjectRepository(Hero)
    private readonly heroRepository: Repository<Hero>,
  ) {}

  async create(createHeroDto: CreateHeroDto): Promise<Hero> {
    // Convert DTO to entity format
    const heroData = {
      name: createHeroDto.name,
      type: createHeroDto.type,
      description: createHeroDto.description,
      baseHealth: createHeroDto.attributes.health,
      baseMana: createHeroDto.attributes.mana,
      baseDamage: createHeroDto.attributes.damage,
      baseArmor: createHeroDto.attributes.armor,
      baseMagicResistance: createHeroDto.attributes.magicResistance,
      // Other attributes can be mapped as needed
    };
    
    const hero = this.heroRepository.create(heroData);
    return this.heroRepository.save(hero);
  }

  async findAll(): Promise<Hero[]> {
    return this.heroRepository.find();
  }

  async findOne(id: string): Promise<Hero> {
    const hero = await this.heroRepository.findOne({ where: { id } });
    if (!hero) {
      throw new NotFoundException(`Hero with ID ${id} not found`);
    }
    return hero;
  }

  async update(id: string, updateHeroDto: UpdateHeroDto): Promise<Hero> {
    const hero = await this.findOne(id);
    
    // Convert DTO to entity format
    const updateData = {
      ...(updateHeroDto.name && { name: updateHeroDto.name }),
      ...(updateHeroDto.type && { type: updateHeroDto.type }),
      ...(updateHeroDto.description && { description: updateHeroDto.description }),
      ...(updateHeroDto.attributes && {
        baseHealth: updateHeroDto.attributes.health,
        baseMana: updateHeroDto.attributes.mana,
        baseDamage: updateHeroDto.attributes.damage,
        baseArmor: updateHeroDto.attributes.armor,
        baseMagicResistance: updateHeroDto.attributes.magicResistance,
        // Other attributes can be mapped as needed
      })
    };
    
    Object.assign(hero, updateData);
    return this.heroRepository.save(hero);
  }

  async remove(id: string): Promise<Hero> {
    const hero = await this.findOne(id);
    return this.heroRepository.remove(hero);
  }

  private mapToResponseDto(hero: Hero): HeroResponseDto {
    return {
      id: hero.id,
      name: hero.name,
      description: hero.description,
      type: hero.type,
      imageUrl: '', // This field doesn't exist in the entity yet
      attributes: {
        damage: hero.baseDamage,
        armor: hero.baseArmor,
        magicResistance: hero.baseMagicResistance,
        health: hero.baseHealth,
        mana: hero.baseMana,
        strength: 0, // These values don't exist in the entity yet
        agility: 0,
        intelligence: 0
      },
      skills: [], // We need to fetch hero skills separately
      createdAt: hero.createdAt,
      updatedAt: hero.updatedAt,
    };
  }
} 