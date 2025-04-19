import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { PasswordService } from './services/password.service';
import { Role } from '../auth/enums/roles.enum';
import * as bcryptjs from 'bcryptjs';
import { RegisterUserDto } from './dto/register-user.dto';
import { ILogger } from '../core/logger/logger.interface';
import { Inject } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.setContext('UserService');
  }

  async create(registerUserDto: RegisterUserDto): Promise<UserResponseDto> {
    this.logger.debug(`Creating new user with email: ${registerUserDto.email}`);
    const hashedPassword = await bcryptjs.hash(registerUserDto.password, 10);

    const user = this.userRepository.create({
      ...registerUserDto,
      password: hashedPassword,
      role: Role.USER,
      active: true,
      blocked: false,
    });

    const savedUser = await this.userRepository.save(user);
    this.logger.info(`User created successfully with ID: ${savedUser.id}`);
    return this.mapToResponseDto(savedUser);
  }

  async findAll(): Promise<UserResponseDto[]> {
    this.logger.debug('Fetching all users');
    const users = await this.userRepository.find();
    this.logger.info(`Retrieved ${users.length} users`);
    return users.map(user => this.mapToResponseDto(user));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    this.logger.debug(`Finding user with ID: ${id}`);
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.warn(`User not found with ID: ${id}`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.logger.debug(`User found with ID: ${id}`);
    return this.mapToResponseDto(user);
  }

  async findByEmail(email: string): Promise<UserResponseDto | null> {
    this.logger.debug(`Finding user with email: ${email}`);
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      this.logger.debug(`No user found with email: ${email}`);
      return null;
    }
    this.logger.debug(`User found with email: ${email}`);
    return this.mapToResponseDto(user);
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    this.logger.debug(`Finding user with email (including password): ${email}`);
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      this.logger.debug(`No user found with email: ${email}`);
      return null;
    }
    this.logger.debug(`User found with email: ${email}`);
    return user;
  }

  async updateProfile(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    this.logger.debug(`Updating profile for user ID: ${userId}`);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      this.logger.warn(`User not found with ID: ${userId}`);
      throw new NotFoundException('User not found');
    }

    const allowedFields = ['email', 'password', 'nickname', 'avatarUrl'];
    const restrictedFields = Object.keys(updateUserDto).filter(
      field => !allowedFields.includes(field)
    );

    if (restrictedFields.length > 0) {
      this.logger.warn(`Attempted to update restricted fields: ${restrictedFields.join(', ')}`);
      throw new ForbiddenException(
        `You can only update: ${allowedFields.join(', ')}. Restricted fields: ${restrictedFields.join(', ')}`
      );
    }

    if (updateUserDto.password) {
      this.logger.debug(`Updating password for user ID: ${userId}`);
      updateUserDto.password = await this.passwordService.hashPassword(updateUserDto.password);
    }

    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);
    this.logger.info(`Profile updated successfully for user ID: ${userId}`);
    return this.mapToResponseDto(updatedUser);
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
    currentUserRole: Role,
  ): Promise<UserResponseDto> {
    this.logger.debug(`Admin update requested for user ID: ${userId} by role: ${currentUserRole}`);
    if (currentUserRole !== Role.ADMIN) {
      this.logger.warn(`Non-admin attempt to update user ID: ${userId}`);
      throw new ForbiddenException('Only administrators can update user details');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      this.logger.warn(`User not found with ID: ${userId}`);
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.password) {
      this.logger.debug(`Admin updating password for user ID: ${userId}`);
      updateUserDto.password = await this.passwordService.hashPassword(updateUserDto.password);
    }

    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);
    this.logger.info(`User updated successfully by admin for user ID: ${userId}`);
    return this.mapToResponseDto(updatedUser);
  }

  async remove(id: string): Promise<void> {
    this.logger.debug(`Attempting to remove user with ID: ${id}`);
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      this.logger.warn(`User not found for deletion with ID: ${id}`);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.logger.info(`User removed successfully with ID: ${id}`);
  }

  async updateLastLogin(userId: string): Promise<UserResponseDto> {
    this.logger.debug(`Updating last login for user ID: ${userId}`);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      this.logger.warn(`User not found with ID: ${userId}`);
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.lastLoginAt = new Date();
    const updatedUser = await this.userRepository.save(user);
    this.logger.info(`Last login updated for user ID: ${userId}`);
    return this.mapToResponseDto(updatedUser);
  }

  async verifyPassword(userId: string, password: string): Promise<boolean> {
    this.logger.debug(`Verifying password for user ID: ${userId}`);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      this.logger.warn(`User not found with ID: ${userId}`);
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const isValid = await this.passwordService.comparePasswords(password, user.password);
    this.logger.debug(`Password verification ${isValid ? 'successful' : 'failed'} for user ID: ${userId}`);
    return isValid;
  }

  async updateRole(userId: string, newRole: Role, currentUserRole: Role): Promise<User> {
    this.logger.debug(`Role update requested for user ID: ${userId} to role: ${newRole} by role: ${currentUserRole}`);
    if (currentUserRole !== Role.ADMIN) {
      this.logger.warn(`Non-admin attempt to change role for user ID: ${userId}`);
      throw new ForbiddenException('Only administrators can change user roles');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      this.logger.warn(`User not found with ID: ${userId}`);
      throw new NotFoundException('User not found');
    }

    user.role = newRole;
    const updatedUser = await this.userRepository.save(user);
    this.logger.info(`Role updated successfully for user ID: ${userId} to: ${newRole}`);
    return updatedUser;
  }

  private mapToResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl,
      blocked: user.blocked,
      active: user.active,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLoginAt: user.lastLoginAt,
    };
  }
} 