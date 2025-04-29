import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { Hero } from '../database/entity/hero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hero])],
  controllers: [HeroesController],
  providers: [HeroesService],
  exports: [HeroesService]
})
export class HeroesModule {} 