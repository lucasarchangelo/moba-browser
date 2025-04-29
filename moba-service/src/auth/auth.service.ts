import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { User } from '../database/entity/user.entity';
import { LoginResponseDto } from './dto/login-response.dto';
import * as bcrypt from 'bcryptjs';
import { ILogger } from '../core/logger/logger.interface';
import { Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {}

  /**
   * Validate user credentials and return a JWT token
   * @param email User's email
   * @param password User's password
   * @returns JWT token and user data
   */
  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    this.logger.debug(`Login attempt for user: ${loginDto.email}`, { service: 'AuthService' });
    const user = await this.userService.findByEmailWithPassword(loginDto.email);
    if (!user) {
      this.logger.warn(`Login failed: User not found with email: ${loginDto.email}`, { service: 'AuthService' });
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.userService.verifyPassword(user.id, loginDto.password);
    if (!isPasswordValid) {
      this.logger.warn(`Login failed: Invalid password for user: ${loginDto.email}`, { service: 'AuthService' });
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.active) {
      this.logger.warn(`Login failed: Inactive user attempted to login: ${loginDto.email}`, { service: 'AuthService' });
      throw new UnauthorizedException('Account is inactive');
    }

    if (user.blocked) {
      this.logger.warn(`Login failed: Blocked user attempted to login: ${loginDto.email}`, { service: 'AuthService' });
      throw new UnauthorizedException('Account is blocked');
    }

    const payload = { 
      sub: user.id, 
      email: user.email,
      role: user.role,
      correlationId: this.logger.getCorrelationId()
    };

    const token = this.jwtService.sign(payload);
    this.logger.info(`User logged in successfully: ${loginDto.email}`, { service: 'AuthService' });

    await this.userService.updateLastLogin(user.id);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        role: user.role,
      },
    };
  }

  /**
   * Validate user credentials
   * @param email User's email
   * @param password User's password
   * @returns User data if validation is successful
   * @throws UnauthorizedException if validation fails
   */
  async validateUser(id: string): Promise<any> {
    this.logger.debug(`Validating user with ID: ${id}`, { service: 'AuthService' });
    const user = await this.userService.findOne(id);
    if (!user.active) {
      this.logger.warn(`Validation failed: Inactive user ID: ${id}`, { service: 'AuthService' });
      throw new UnauthorizedException('Account is inactive');
    }
    if (user.blocked) {
      this.logger.warn(`Validation failed: Blocked user ID: ${id}`, { service: 'AuthService' });
      throw new UnauthorizedException('Account is blocked');
    }
    this.logger.debug(`User validated successfully: ${id}`, { service: 'AuthService' });
    return user;
  }

  async logout(): Promise<{ message: string }> {
    // In a real application, you might want to:
    // 1. Blacklist the token
    // 2. Clear any server-side sessions
    // 3. Update user's last logout time
    this.logger.info('User logged out', { service: 'AuthService' });
    return { message: 'Successfully logged out' };
  }
} 