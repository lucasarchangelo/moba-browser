import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { HeroSkill } from './hero-skill.entity';
import { Inventory } from './inventory.entity';
import { EquippedItem } from './equipped-item.entity';
import { HeroType } from '../enums/hero-type.enum';
import { User } from './user.entity';
import { Season } from './season.entity';

@Entity('heroes')
@Unique(['userId', 'seasonId'])
export class Hero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  level: number;

  @Column({ default: 0 })
  strength: number;

  @Column({ default: 0 })
  dexterity: number;

  @Column({ default: 0 })
  intelligence: number;

  @Column({ default: 0 })
  currentLife: number;

  @Column({ default: 0 })
  currentMana: number;

  @ManyToOne(() => User, user => user.heroes)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false })
  userId: string;

  @ManyToOne(() => Season, season => season.heroes)
  @JoinColumn({ name: 'seasonId' })
  season: Season;

  @Column({ nullable: false })
  seasonId: string;

  @OneToMany(() => HeroSkill, heroSkill => heroSkill.hero)
  heroSkills: HeroSkill[];

  @OneToMany(() => Inventory, inventory => inventory.hero)
  inventory: Inventory[];

  @OneToMany(() => EquippedItem, equippedItem => equippedItem.hero)
  equippedItems: EquippedItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 