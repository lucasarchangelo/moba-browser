import { Injectable } from '@nestjs/common';
import { ILogger, ILoggerOptions, ILoggerMetadata } from './logger.interface';

@Injectable()
export abstract class AbstractLoggerService implements ILogger {
  protected context: string = 'Application';
  protected correlationId?: string;

  constructor(options?: ILoggerOptions) {
    this.correlationId = options?.correlationId;
  }

  abstract debug(message: string, metadata?: ILoggerMetadata): void;
  abstract log(message: string, metadata?: ILoggerMetadata): void;
  abstract info(message: string, metadata?: ILoggerMetadata): void;
  abstract warn(message: string, metadata?: ILoggerMetadata): void;
  abstract error(message: string, trace?: string, metadata?: ILoggerMetadata): void;
  abstract fatal(message: string, trace?: string, metadata?: ILoggerMetadata): void;
  abstract emergency(message: string, trace?: string, metadata?: ILoggerMetadata): void;
  abstract startProfile(id: string): void;
  abstract getCorrelationId(): string;

  protected formatMessage(message: string, metadata?: ILoggerMetadata): string {
    const timestamp = new Date().toISOString();
    const service = metadata?.service || this.context;
    const correlation = this.correlationId ? `[${this.correlationId}]` : '';
    return `${timestamp} ${correlation} [service: ${service}] ${message}`;
  }

  setCorrelationId(correlationId: string): void {
    this.correlationId = correlationId;
  }
} 