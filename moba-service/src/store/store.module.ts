import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { Item } from '../database/entity/item.entity';
import { Inventory } from '../database/entity/inventory.entity';
import { Hero } from '../database/entity/hero.entity';
import { Season } from '../database/entity/season.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, Inventory, Hero, Season])
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService]
})
export class StoreModule {} 