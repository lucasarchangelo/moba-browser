import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../../auth/enums/roles.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column({ default: false })
  blocked: boolean;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @Column({ 
    type: 'enum', 
    enum: Role, 
    default: Role.USER 
  })
  role: Role;

  @Column({ nullable: true })
  avatarUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 