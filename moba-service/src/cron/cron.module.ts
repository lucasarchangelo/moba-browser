import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroFarmingCronService } from './hero-farming.cron';
import { Hero } from '../database/entity/hero.entity';
import { HeroesModule } from '../heroes/heroes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hero]),
    HeroesModule
  ],
  providers: [HeroFarmingCronService],
  exports: [HeroFarmingCronService],
})
export class CronModule {} 