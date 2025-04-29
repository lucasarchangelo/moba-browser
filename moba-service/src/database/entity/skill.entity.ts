import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { HeroSkill } from './hero-skill.entity';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  baseDamage: number;

  @Column({ default: 0 })
  baseCooldown: number;

  @Column({ default: 0 })
  baseManaCost: number;

  @Column({ default: 0 })
  baseRange: number;

  @Column({ default: 0 })
  baseAreaOfEffect: number;

  @OneToMany(() => HeroSkill, heroSkill => heroSkill.skill)
  heroSkills: HeroSkill[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 