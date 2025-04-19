import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/schemas/user.schema';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { PasswordService } from './services/password.service';
import { LoggerModule } from '../core/logger/logger.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UserService, PasswordService],
  exports: [UserService],
})
export class UsersModule {} 