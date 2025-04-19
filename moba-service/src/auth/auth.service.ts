import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { User } from '../database/schemas/user.schema';
import { LoginResponseDto } from './dto/login-response.dto';
import * as bcrypt from 'bcryptjs';
import { ILogger } from '../core/logger/logger.interface';
import { Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.setContext('AuthService');
  }

  /**
   * Validate user credentials and return a JWT token
   * @param email User's email
   * @param password User's password
   * @returns JWT token and user data
   */
  async login(email: string, password: string): Promise<LoginResponseDto> {
    this.logger.debug(`Login attempt for email: ${email}`);
    const user = await this.validateUser(email, password);
    
    // Generate a correlation ID for this user session
    const correlationId = uuidv4();
    this.logger.debug(`Generated correlation ID for user session: ${correlationId}`);
    
    const payload = {
      sub: user.id.toString(),
      email: user.email,
      role: user.role,
      correlationId, // Include correlation ID in the JWT payload
    };

    await this.userService.updateLastLogin(user.id.toString());

    const accessToken = await this.jwtService.signAsync(payload);
    this.logger.info(`User logged in successfully: ${user.email} with correlation ID: ${correlationId}`);

    return {
      access_token: accessToken,
      user: {
        id: user.id.toString(),
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
  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmailWithPassword(email);
    
    if (!user) {
      this.logger.warn(`Login failed: User not found with email: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.active) {
      this.logger.warn(`Login failed: Inactive account for email: ${email}`);
      throw new UnauthorizedException('User account is inactive');
    }

    if (user.blocked) {
      this.logger.warn(`Login failed: Blocked account for email: ${email}`);
      throw new UnauthorizedException('User account is blocked');
    }

    const isPasswordValid = await this.userService.verifyPassword(user.id.toString(), password);
    
    if (!isPasswordValid) {
      this.logger.warn(`Login failed: Invalid password for email: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async logout(): Promise<{ message: string }> {
    // In a real application, you might want to:
    // 1. Blacklist the token
    // 2. Clear any server-side sessions
    // 3. Update user's last logout time
    this.logger.info('User logged out');
    return { message: 'Successfully logged out' };
  }
} 