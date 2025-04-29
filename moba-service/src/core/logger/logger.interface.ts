import { LoggerService } from '@nestjs/common';

export const LoggerBaseKey = Symbol('LoggerBase');
export const LoggerKey = Symbol('Logger');

export interface ILoggerOptions {
  context?: string;
  correlationId?: string;
}

export interface ILoggerMetadata {
  service?: string;
  correlationId?: string;
}

export interface ILogger extends LoggerService {
  debug(message: string, metadata?: ILoggerMetadata): void;
  log(message: string, metadata?: ILoggerMetadata): void;
  info(message: string, metadata?: ILoggerMetadata): void;
  warn(message: string, metadata?: ILoggerMetadata): void;
  error(message: string, trace?: string, metadata?: ILoggerMetadata): void;
  fatal(message: string, trace?: string, metadata?: ILoggerMetadata): void;
  emergency(message: string, trace?: string, metadata?: ILoggerMetadata): void;
  startProfile(id: string): void;
  setCorrelationId(correlationId: string): void;
  getCorrelationId(): string;
}

// Export the symbol as a value for dependency injection
export const ILogger = Symbol('ILogger'); 