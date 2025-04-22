import { Global, Module } from '@nestjs/common';
import { WinstonLoggerService } from './winston-logger.service';
import { ILogger } from './logger.interface';
import { CorrelationMiddleware } from './correlation.middleware';
import { MorganMiddleware } from './morgan.middleware';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule,
  ],
  providers: [
    {
      provide: WinstonLoggerService,
      useClass: WinstonLoggerService,
    },
    {
      provide: ILogger,
      useExisting: WinstonLoggerService,
    },
    CorrelationMiddleware,
    MorganMiddleware,
  ],
  exports: [ILogger, WinstonLoggerService, CorrelationMiddleware, MorganMiddleware],
})
export class LoggerModule {} 