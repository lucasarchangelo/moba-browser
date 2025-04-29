import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { Skill } from '../database/entity/skill.entity';
import { LoggerModule } from 'src/core/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Skill]),
    LoggerModule,
  ],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {} 