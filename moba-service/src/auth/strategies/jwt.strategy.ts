import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../users/users.service';
import { ILogger } from '../../core/logger/logger.interface';
import { Inject } from '@nestjs/common';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  correlationId?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOne(payload.sub);
    
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.active) {
      throw new UnauthorizedException('User account is inactive');
    }

    if (user.blocked) {
      throw new UnauthorizedException('User account is blocked');
    }

    // Set the correlation ID from the JWT token if available
    if (payload.correlationId) {
      this.logger.setCorrelationId(payload.correlationId);
      this.logger.debug(`Using correlation ID from JWT token: ${payload.correlationId}`, { service: 'JwtStrategy' });
    }

    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      correlationId: payload.correlationId,
    };
  }
} 