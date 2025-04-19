import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';
import { ILogger } from './logger.interface';
import { Inject } from '@nestjs/common';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  private morganMiddleware: any;

  constructor(@Inject(ILogger) private readonly logger: ILogger) {
    this.morganMiddleware = morgan((tokens, req, res) => {
      const correlationId = req['correlationId'] || 'no-correlation-id';
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res),
        'ms',
        `[${correlationId}]`,
      ].join(' ');
    }, {
      stream: {
        write: (message: string) => {
          this.logger.info(message.trim());
        },
      },
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.morganMiddleware(req, res, next);
  }
} 