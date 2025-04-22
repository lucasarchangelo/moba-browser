import { LoggerService } from '@nestjs/common';
import { ILogger, ILoggerMetadata } from './logger.interface';

export class NestLoggerAdapter implements LoggerService {
  constructor(private readonly logger: ILogger) {}

  log(message: string, context?: ILoggerMetadata): void {
    this.logger.log(message, context);
  }

  error(message: string, trace?: string, context?: ILoggerMetadata): void {
    this.logger.error(message, trace, context);
  }

  warn(message: string, context?: ILoggerMetadata): void {
    this.logger.warn(message, context);
  }

  debug(message: string, context?: ILoggerMetadata): void {
    this.logger.debug(message, context);
  }

  verbose(message: string, context?: ILoggerMetadata): void {
    this.logger.debug(message, context);
  }
} 