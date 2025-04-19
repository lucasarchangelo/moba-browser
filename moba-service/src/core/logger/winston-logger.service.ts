import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { AbstractLoggerService } from './abstract-logger.service';
import { ILoggerOptions } from './logger.interface';

@Injectable()
export class WinstonLoggerService extends AbstractLoggerService {
  private logger: winston.Logger;

  constructor() {
    super();
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      ],
    });
  }

  debug(message: string, context?: string): void {
    this.logger.debug(this.formatMessage(message, context));
  }

  log(message: string, context?: string): void {
    this.logger.info(this.formatMessage(message, context));
  }

  info(message: string, context?: string): void {
    this.logger.info(this.formatMessage(message, context));
  }

  warn(message: string, context?: string): void {
    this.logger.warn(this.formatMessage(message, context));
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error(this.formatMessage(message, context), { trace });
  }

  fatal(message: string, trace?: string, context?: string): void {
    this.logger.error(this.formatMessage(message, context), { trace });
  }

  emergency(message: string, trace?: string, context?: string): void {
    this.logger.error(this.formatMessage(message, context), { trace });
  }

  startProfile(id: string): void {
    // Winston doesn't have a direct equivalent to startProfile
    // You might want to implement this using winston's profiling capabilities
    this.logger.info(`Profile started: ${id}`);
  }
} 