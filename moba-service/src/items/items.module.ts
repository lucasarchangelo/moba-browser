import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../database/entity/item.entity';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { LoggerModule } from '../core/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    LoggerModule,
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {} 