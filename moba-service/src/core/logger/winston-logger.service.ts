import { Injectable } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import { AbstractLoggerService } from './abstract-logger.service';
import { ILoggerOptions, ILoggerMetadata } from './logger.interface';
import LokiTransport from 'winston-loki';

// Custom format to add correlationId as a label
const addCorrelationId = format((info: any) => {
  if (info.correlationId) {
    info.labels = info.labels || {};
    info.labels.correlationId = info.correlationId;
  }
  return info;
});

@Injectable()
export class WinstonLoggerService extends AbstractLoggerService {
  private static instance: WinstonLoggerService;
  private logger: Logger;
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
        format.json(),
        addCorrelationId()
      ),
      transports: [
        new transports.Console(),
        new LokiTransport({
          host: 'http://loki:3100',
          json: true,
          format: format.combine(
            format.json(),
            format((info: any) => {
              info.labels = {
                job: 'moba-service',
                correlationId: info.correlationId || 'default-correlation-id',
                level: info.level,
                service: info.service || 'Application',
              };
              return info;
            })()
          ),
          replaceTimestamp: true,
          onConnectionError: (err) => console.error('Loki connection error:', err),
          batching: true,
          interval: 5,
        }),
      ],
    });
  }

  debug(message: string, metadata?: ILoggerMetadata): void {
    const logMetadata = { ...metadata, correlationId: this.correlationId };
    this.logger.debug(this.formatMessage(message), logMetadata);
  }

  log(message: string, metadata?: ILoggerMetadata): void {
    const logMetadata = { ...metadata, correlationId: this.correlationId };
    this.logger.info(this.formatMessage(message), logMetadata);
  }

  info(message: string, metadata?: ILoggerMetadata): void {
    const logMetadata = { ...metadata, correlationId: this.correlationId };
    this.logger.info(this.formatMessage(message), logMetadata);
  }

  warn(message: string, metadata?: ILoggerMetadata): void {
    const logMetadata = { ...metadata, correlationId: this.correlationId };
    this.logger.warn(this.formatMessage(message), logMetadata);
  }

  error(message: string, trace?: string, metadata?: ILoggerMetadata): void {
    const logMetadata = { ...metadata, correlationId: this.correlationId, trace };
    this.logger.error(this.formatMessage(message), logMetadata);
  }

  fatal(message: string, trace?: string, metadata?: ILoggerMetadata): void {
    const logMetadata = { ...metadata, correlationId: this.correlationId, trace };
    this.logger.error(this.formatMessage(message), logMetadata);
  }

  emergency(message: string, trace?: string, metadata?: ILoggerMetadata): void {
    const logMetadata = { ...metadata, correlationId: this.correlationId, trace };
    this.logger.error(this.formatMessage(message), logMetadata);
  }

  startProfile(id: string): void {
    this.logger.info(`Profile started: ${id}`);
  }

  getCorrelationId(): string {
    return this.correlationId || 'no-correlation-id';
  }

  setCorrelationId(correlationId: string): void {
    this.correlationId = correlationId;
  }

  protected formatMessage(message: string, metadata?: ILoggerMetadata): string {
    const timestamp = new Date().toISOString();
    const service = metadata?.service || this.context || 'Application';
    const correlation = this.correlationId ? `[${this.correlationId}]` : '';
    return `${timestamp} ${correlation} [${service}] ${message}`;
  }
} 