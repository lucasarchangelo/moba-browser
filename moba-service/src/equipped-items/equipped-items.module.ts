import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquippedItemsService } from './equipped-items.service';
import { EquippedItemsController } from './equipped-items.controller';
import { EquippedItem } from '../database/entity/equipped-item.entity';
import { Hero } from '../database/entity/hero.entity';
import { Item } from '../database/entity/item.entity';
import { SeasonsService } from '../seasons/seasons.service';
import { Season } from '../database/entity/season.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EquippedItem, Hero, Item, Season])
  ],
  controllers: [EquippedItemsController],
  providers: [EquippedItemsService, SeasonsService],
  exports: [EquippedItemsService]
})
export class EquippedItemsModule {} 