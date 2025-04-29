import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { MatchEventType } from '../enums/match-event-type.enum';
import { Hero } from './hero.entity';
import { Match } from './match.entity';

@Entity('match_events')
export class MatchEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Match)
  match: Match;

  @Column({ type: 'enum', enum: MatchEventType })
  eventType: MatchEventType;

  @ManyToOne(() => Hero)
  hero: Hero;

  @ManyToOne(() => Hero, { nullable: true })
  target: Hero;

  @Column('jsonb')
  details: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
} 