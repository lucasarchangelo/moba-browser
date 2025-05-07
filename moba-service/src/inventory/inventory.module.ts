import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { Inventory } from '../database/entity/inventory.entity';
import { Hero } from '../database/entity/hero.entity';
import { Season } from '../database/entity/season.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventory, Hero, Season])
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService]
})
export class InventoryModule {} 