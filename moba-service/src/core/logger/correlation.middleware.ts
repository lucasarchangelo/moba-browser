import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ILogger } from './logger.interface';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CorrelationMiddleware implements NestMiddleware {
  constructor(
    @Inject(ILogger) private readonly logger: ILogger,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    let correlationId: string | undefined;
    
    // Try to extract correlationId from JWT token
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const secret = this.configService.get<string>('JWT_SECRET');
        if (secret) {
          const decoded = this.jwtService.verify(token, { secret });
          if (decoded && decoded.correlationId) {
            correlationId = decoded.correlationId;
            this.logger.debug(`Using correlation ID from JWT token: ${correlationId}`, { service: 'CorrelationMiddleware' });
          }
        }
      } catch (error) {
        // Token verification failed, will generate new correlation ID
        this.logger.debug('Failed to extract correlation ID from JWT token, generating new one', { service: 'CorrelationMiddleware' });
      }
    }
    
    // If no valid correlation ID from JWT, generate a new one
    if (!correlationId) {
      correlationId = uuidv4();
      this.logger.debug(`Generated new correlation ID: ${correlationId}`, { service: 'CorrelationMiddleware' });
    }
    
    // Set the correlation ID in the request
    req['correlationId'] = correlationId;
    
    // Set the correlation ID in the logger
    this.logger.setCorrelationId(correlationId);
    
    next();
  }
} 