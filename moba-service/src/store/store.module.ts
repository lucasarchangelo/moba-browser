import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { Item } from '../database/entity/item.entity';
import { Inventory } from '../database/entity/inventory.entity';
import { Skill } from '../database/entity/skill.entity';
import { HeroSkill } from '../database/entity/hero-skill.entity';
import { Hero } from '../database/entity/hero.entity';
import { HeroesModule } from '../heroes/heroes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, Inventory, Skill, HeroSkill, Hero]),
    HeroesModule
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService]
})
export class StoreModule {} 