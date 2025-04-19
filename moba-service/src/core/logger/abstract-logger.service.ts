import { Injectable } from '@nestjs/common';
import { ILogger, ILoggerOptions } from './logger.interface';

@Injectable()
export abstract class AbstractLoggerService implements ILogger {
  protected context?: string;
  protected correlationId?: string;

  constructor(options?: ILoggerOptions) {
    this.context = options?.context;
    this.correlationId = options?.correlationId;
  }

  abstract debug(message: string, context?: string): void;
  abstract log(message: string, context?: string): void;
  abstract info(message: string, context?: string): void;
  abstract warn(message: string, context?: string): void;
  abstract error(message: string, trace?: string, context?: string): void;
  abstract fatal(message: string, trace?: string, context?: string): void;
  abstract emergency(message: string, trace?: string, context?: string): void;
  abstract startProfile(id: string): void;

  protected formatMessage(message: string, context?: string): string {
    const timestamp = new Date().toISOString();
    const ctx = context || this.context || 'Application';
    const correlation = this.correlationId ? `[${this.correlationId}]` : '';
    return `${timestamp} ${correlation} [${ctx}] ${message}`;
  }

  setContext(context: string): void {
    this.context = context;
  }

  setCorrelationId(correlationId: string): void {
    this.correlationId = correlationId;
  }
} 