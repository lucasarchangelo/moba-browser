import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entity/user.entity';
import { Hero } from './entity/hero.entity';
import { HeroSkill } from './entity/hero-skill.entity';
import { Skill } from './entity/skill.entity';
import { Item } from './entity/item.entity';
import { Inventory } from './entity/inventory.entity';
import { EquippedItem } from './entity/equipped-item.entity';
import { Match } from './entity/match.entity';
import { MatchEvent } from './entity/match-event.entity';
import { Season } from './entity/season.entity';
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
        entities: [User, Hero, HeroSkill, Skill, Item, Inventory, EquippedItem, Match, MatchEvent, Season],
        synchronize: false,
        logging: configService.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Hero, HeroSkill, Skill, Item, Inventory, EquippedItem, Match, MatchEvent]),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {} 