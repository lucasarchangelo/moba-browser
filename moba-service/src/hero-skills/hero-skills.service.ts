import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeroSkill } from '../database/entity/hero-skill.entity';
import { HeroSkillDto } from './dto/hero-skill.dto';
import { HeroesService } from '../heroes/heroes.service';

@Injectable()
export class HeroSkillsService {
  constructor(
    @InjectRepository(HeroSkill)
    private readonly heroSkillRepository: Repository<HeroSkill>,
    private readonly heroesService: HeroesService,
  ) {}

  async getHeroSkills(userId: string): Promise<HeroSkillDto[]> {
    const { hero } = await this.heroesService.findActiveHero(userId);

    // Get all skills for the hero
    const heroSkills = await this.heroSkillRepository.find({
      where: { hero: { id: hero.id } },
      relations: ['skill'],
      order: {
        createdAt: 'DESC'
      }
    });

    return heroSkills.map(heroSkill => ({
      id: heroSkill.id,
      level: heroSkill.level,
      createdAt: heroSkill.createdAt,
      updatedAt: heroSkill.updatedAt,
      skill: {
        id: heroSkill.skill.id,
        name: heroSkill.skill.name,
        description: heroSkill.skill.description,
        magicType: heroSkill.skill.magicType,
        baseDamage: heroSkill.skill.baseDamage,
        baseManaCost: heroSkill.skill.baseManaCost,
        requiredStrength: heroSkill.skill.requiredStrength,
        requiredDexterity: heroSkill.skill.requiredDexterity,
        requiredIntelligence: heroSkill.skill.requiredIntelligence,
        price: heroSkill.skill.price,
        imageUrl: heroSkill.skill.imageUrl,
        effects: heroSkill.skill.effects,
      }
    }));
  }
} 