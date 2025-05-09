import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Hero } from './hero.entity';
import { Skill } from './skill.entity';

@Entity('hero_skills')
export class HeroSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Hero, hero => hero.heroSkills)
  @JoinColumn({ name: 'hero_id' })
  hero: Hero;

  @ManyToOne(() => Skill, skill => skill.heroSkills)
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;

  @Column({ default: 1 })
  level: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 