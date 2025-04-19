import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Hero } from './hero.schema';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Hero)
  hero: Hero;

  @ManyToOne(() => Hero)
  heroKiller: Hero;

  @Column({ default: 0 })
  goldEarned: number;

  @Column({ default: 0 })
  experienceEarned: number;

  @CreateDateColumn()
  createdAt: Date;
} 