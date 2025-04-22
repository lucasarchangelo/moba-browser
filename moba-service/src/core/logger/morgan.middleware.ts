import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ILogger } from './logger.interface';
import { Inject } from '@nestjs/common';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  constructor(@Inject(ILogger) private readonly logger: ILogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const correlationId = req['correlationId'] || 'no-correlation-id';
    
    // Log the request
    this.logger.info(`Request: ${req.method} ${req.url} [${correlationId}]`);
    
    // Capture the response
    res.on('finish', () => {
      const duration = Date.now() - start;
      this.logger.info(`Response: ${req.method} ${req.url} ${res.statusCode} ${duration}ms [${correlationId}]`);
    });
    
    next();
  }
} 