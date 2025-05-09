import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroSkillsController } from './hero-skills.controller';
import { HeroSkillsService } from './hero-skills.service';
import { HeroSkill } from '../database/entity/hero-skill.entity';
import { HeroesModule } from '../heroes/heroes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HeroSkill]),
    HeroesModule
  ],
  controllers: [HeroSkillsController],
  providers: [HeroSkillsService],
  exports: [HeroSkillsService]
})
export class HeroSkillsModule {} 