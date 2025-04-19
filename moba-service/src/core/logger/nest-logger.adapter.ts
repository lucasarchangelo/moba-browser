import { LoggerService } from '@nestjs/common';
import { ILogger } from './logger.interface';

export class NestLoggerAdapter implements LoggerService {
  constructor(private readonly logger: ILogger) {}

  log(message: string, context?: string): void {
    this.logger.log(message, context);
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error(message, trace, context);
  }

  warn(message: string, context?: string): void {
    this.logger.warn(message, context);
  }

  debug(message: string, context?: string): void {
    this.logger.debug(message, context);
  }

  verbose(message: string, context?: string): void {
    this.logger.debug(message, context);
  }
} 