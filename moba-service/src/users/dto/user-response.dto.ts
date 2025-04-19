import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: 'The unique identifier of the user' })
  id: string;

  @ApiProperty({ description: 'The email address of the user' })
  email: string;

  @ApiProperty({ description: 'The nickname of the user' })
  nickname: string;

  @ApiProperty({ description: 'The URL of the user\'s avatar', required: false })
  avatarUrl?: string;

  @ApiProperty({ description: 'Whether the user is blocked' })
  blocked: boolean;

  @ApiProperty({ description: 'Whether the user is active' })
  active: boolean;

  @ApiProperty({ description: 'The user\'s role', default: 'USER' })
  role: string;

  @ApiProperty({ description: 'The date when the user was created' })
  createdAt: Date;

  @ApiProperty({ description: 'The date when the user was last updated' })
  updatedAt: Date;

  @ApiProperty({ description: 'The date when the user last logged in', required: false })
  lastLoginAt?: Date;
} 