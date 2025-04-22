import { Injectable } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import { AbstractLoggerService } from './abstract-logger.service';
import { ILoggerOptions, ILoggerMetadata } from './logger.interface';
import LokiTransport from 'winston-loki';

@Injectable()
export class WinstonLoggerService extends AbstractLoggerService {
  private static instance: WinstonLoggerService;
  private logger;
  protected context: string = 'Application';
  protected correlationId?: string;

  constructor() {
    super();
    
    // Ensure singleton pattern
    if (WinstonLoggerService.instance) {
      return WinstonLoggerService.instance;
    }
    
    WinstonLoggerService.instance = this;
    
    this.logger = createLogger({
      level: 'debug',
      format: format.combine(
        format.timestamp(),
        format.json()
      ),
      transports: [
        new transports.Console(),
        new LokiTransport({
          host: 'http://loki:3100',
          json: true,
          labels: { job: 'moba-service' },
          format: format.json(),
          replaceTimestamp: true,
          onConnectionError: (err) => console.error('Loki connection error:', err),
          batching: true,
          interval: 5,
        }),
      ],
    });
  }

  debug(message: string, metadata?: ILoggerMetadata): void {
    this.logger.debug(this.formatMessage(message, metadata));
  }

  log(message: string, metadata?: ILoggerMetadata): void {
    this.logger.info(this.formatMessage(message, metadata));
  }

  info(message: string, metadata?: ILoggerMetadata): void {
    this.logger.info(this.formatMessage(message, metadata));
  }

  warn(message: string, metadata?: ILoggerMetadata): void {
    this.logger.warn(this.formatMessage(message, metadata));
  }

  error(message: string, trace?: string, metadata?: ILoggerMetadata): void {
    this.logger.error(this.formatMessage(message, metadata), { trace });
  }

  fatal(message: string, trace?: string, metadata?: ILoggerMetadata): void {
    this.logger.error(this.formatMessage(message, metadata), { trace });
  }

  emergency(message: string, trace?: string, metadata?: ILoggerMetadata): void {
    this.logger.error(this.formatMessage(message, metadata), { trace });
  }

  startProfile(id: string): void {
    this.logger.info(`Profile started: ${id}`);
  }

  getCorrelationId(): string {
    return this.correlationId || 'no-correlation-id';
  }

  protected formatMessage(message: string, metadata?: ILoggerMetadata): string {
    const timestamp = new Date().toISOString();
    const service = metadata?.service || this.context || 'Application';
    const correlation = this.correlationId ? `[${this.correlationId}]` : '';
    return `${timestamp} ${correlation} [service: ${service}] ${message}`;
  }
} 