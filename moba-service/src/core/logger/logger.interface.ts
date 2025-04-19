import { LoggerService } from '@nestjs/common';

export const LoggerBaseKey = Symbol('LoggerBase');
export const LoggerKey = Symbol('Logger');

export interface ILogger extends LoggerService {
  debug(message: string, context?: string): void;
  log(message: string, context?: string): void;
  info(message: string, context?: string): void;
  warn(message: string, context?: string): void;
  error(message: string, trace?: string, context?: string): void;
  fatal(message: string, trace?: string, context?: string): void;
  emergency(message: string, trace?: string, context?: string): void;
  startProfile(id: string): void;
  setCorrelationId(correlationId: string): void;
  setContext(context: string): void;
}

export interface ILoggerOptions {
  context?: string;
  correlationId?: string;
}

// Export the symbol as a value for dependency injection
export const ILogger = Symbol('ILogger'); 