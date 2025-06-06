import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Reflector } from '@nestjs/core';
import { LoggerModule } from './core/logger/logger.module';
import { CorrelationMiddleware } from './core/logger/correlation.middleware';
import { MorganMiddleware } from './core/logger/morgan.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import { SkillsModule } from './skills/skills.module';
import { SeasonsModule } from './seasons/seasons.module';
import { HeroesModule } from './heroes/heroes.module';
import { StoreModule } from './store/store.module';
import { InventoryModule } from './inventory/inventory.module';
import { HeroSkillsModule } from './hero-skills/hero-skills.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '24h'),
        },
      }),
      inject: [ConfigService],
    }),
    LoggerModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    ItemsModule,
    SkillsModule,
    HeroesModule,
    SeasonsModule,
    StoreModule,
    InventoryModule,
    HeroSkillsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    Reflector,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorrelationMiddleware, MorganMiddleware)
      .forRoutes('*');
  }
}
