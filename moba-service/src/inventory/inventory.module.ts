import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { Inventory } from '../database/entity/inventory.entity';
import { HeroesModule } from '../heroes/heroes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventory]),
    HeroesModule
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService]
})
export class InventoryModule {} 