import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './schemas/user.schema';
import { Hero } from './schemas/hero.schema';
import { HeroSkill } from './schemas/hero-skill.schema';
import { Skill } from './schemas/skill.schema';
import { Item } from './schemas/item.schema';
import { Inventory } from './schemas/inventory.schema';
import { EquippedItem } from './schemas/equipped-item.schema';
import { Match } from './schemas/match.schema';
import { MatchEvent } from './schemas/match-event.schema';
import { MigrationService } from './migrations/migration.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [User, Hero, HeroSkill, Skill, Item, Inventory, EquippedItem, Match, MatchEvent],
        synchronize: configService.get('NODE_ENV') !== 'production', // Auto-sync schema in development
        logging: configService.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Hero, HeroSkill, Skill, Item, Inventory, EquippedItem, Match, MatchEvent]),
  ],
  providers: [MigrationService],
  exports: [TypeOrmModule],
})
export class DatabaseModule {} 