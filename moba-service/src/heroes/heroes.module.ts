import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { Hero } from '../database/entity/hero.entity';
import { SeasonsModule } from 'src/seasons/seasons.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hero]), SeasonsModule],
  controllers: [HeroesController],
  providers: [HeroesService],
  exports: [HeroesService]
})
export class HeroesModule {} 