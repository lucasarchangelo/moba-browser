import { IsEmail, IsString, IsOptional, MinLength, IsBoolean, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../auth/enums/roles.enum';

export class UpdateUserDto {
  @ApiProperty({ 
    description: 'The email address of the user',
    required: false,
    example: 'user@example.com'
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ 
    description: 'The password for the user account',
    required: false,
    minLength: 6
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiProperty({ 
    description: 'The nickname of the user',
    required: false,
    example: 'johndoe'
  })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiProperty({ 
    description: 'The URL of the user\'s avatar',
    required: false,
    example: 'https://example.com/avatar.jpg'
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({ 
    description: 'Whether the user is blocked',
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean()
  blocked?: boolean;

  @ApiProperty({ 
    description: 'Whether the user is active',
    required: false,
    default: true
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty({ 
    description: 'The role of the user',
    required: false,
    enum: Role,
    default: Role.USER
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
} 