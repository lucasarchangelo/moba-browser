import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Hero } from './hero.schema';
import { Skill } from './skill.schema';

@Entity('hero_skills')
export class HeroSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Hero, hero => hero.skills)
  @JoinColumn({ name: 'heroId' })
  hero: Hero;

  @Column()
  heroId: string;

  @ManyToOne(() => Skill)
  @JoinColumn({ name: 'skillId' })
  skill: Skill;

  @Column()
  skillId: string;

  @Column({ default: 1 })
  level: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 