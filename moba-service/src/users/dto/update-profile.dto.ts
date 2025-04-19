import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
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
} 