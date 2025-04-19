import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class PasswordService {
  private readonly SALT_ROUNDS = 10;

  /**
   * Hash a password using bcryptjs
   * @param password The plain text password to hash
   * @returns The hashed password
   */
  async hashPassword(password: string): Promise<string> {
    return bcryptjs.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Compare a plain text password with a hashed password
   * @param plainPassword The plain text password to check
   * @param hashedPassword The hashed password to compare against
   * @returns True if the passwords match, false otherwise
   */
  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcryptjs.compare(plainPassword, hashedPassword);
  }
} 