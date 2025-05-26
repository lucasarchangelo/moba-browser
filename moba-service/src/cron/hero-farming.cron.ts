import { CronJob } from 'cron';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from '../database/entity/hero.entity';
import { HeroStatus } from '../database/enums/hero-status.enum';
import { TOWER_REWARDS, FOUNTAIN_RECOVERY } from '../config/tower-rewards.config';
import { HeroesService } from '../heroes/heroes.service';

@Injectable()
export class HeroFarmingCronService {
  private farmingJob: CronJob;

  constructor(
    @InjectRepository(Hero)
    private heroRepository: Repository<Hero>,
    private heroesService: HeroesService,
  ) {
    // Run every minute
    this.farmingJob = new CronJob('*/1 * * * *', () => {
      this.processFarming();
    });
  }

  onModuleInit() {
    this.farmingJob.start();
  }

  onModuleDestroy() {
    this.farmingJob.stop();
  }

  private async processFarming() {
    try {
      // Get all heroes that are farming (in towers)
      const farmingHeroes = await this.heroRepository.find({
        where: [
          { status: HeroStatus.DEFENSIVE_TOWER },
          { status: HeroStatus.ATTACKING_TOWER }
        ]
      });

      for (const hero of farmingHeroes) {
        await this.updateHeroStatus(hero);
      }
    } catch (error) {
      console.error('Error processing hero farming:', error);
    }
  }

  private async updateHeroStatus(hero: Hero) {
    const rewards = TOWER_REWARDS[hero.status];
    const now = new Date();
    const lastUpdate = hero.lastUpdate || now;
    const minutesPassed = (now.getTime() - lastUpdate.getTime()) / (1000 * 60);

    // Get hero's current stats using the hero service
    const heroStats = await this.heroesService.findOne(hero.id);
    const { baseHealth, baseMana } = heroStats.attributes;

    // Apply rewards
    hero.money += rewards.gold * minutesPassed;
    hero.experience += rewards.xp * minutesPassed;

    // Apply drains
    hero.currentLife -= (baseHealth * rewards.lifeDrain * minutesPassed) / 100;
    hero.currentMana -= (baseMana * rewards.manaDrain * minutesPassed) / 100;

    // Ensure values don't go below 0
    hero.currentLife = Math.max(0, hero.currentLife);
    hero.currentMana = Math.max(0, hero.currentMana);

    // Check if hero needs to return to fountain (20% threshold)
    if (hero.currentLife <= (baseHealth * 0.2) || 
        hero.currentMana <= (baseMana * 0.2)) {
      hero.status = HeroStatus.FOUNTAIN;
    }

    // Update last update timestamp
    hero.lastUpdate = now;

    // Save changes
    await this.heroRepository.save(hero);
  }
} 