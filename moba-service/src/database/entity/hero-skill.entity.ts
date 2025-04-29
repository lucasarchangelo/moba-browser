import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Hero } from './hero.entity';
import { Skill } from './skill.entity';

@Entity('hero_skills')
export class HeroSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Hero, hero => hero.heroSkills)
  hero: Hero;

  @ManyToOne(() => Skill, skill => skill.heroSkills)
  skill: Skill;

  @Column({ default: 0 })
  level: number;

  @Column({ default: 0 })
  damageMultiplier: number;

  @Column({ default: 0 })
  cooldownMultiplier: number;

  @Column({ default: 0 })
  manaCostMultiplier: number;

  @Column({ default: 0 })
  rangeMultiplier: number;

  @Column({ default: 0 })
  areaOfEffectMultiplier: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 