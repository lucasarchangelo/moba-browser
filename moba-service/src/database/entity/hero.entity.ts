import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { HeroSkill } from './hero-skill.entity';
import { Inventory } from './inventory.entity';
import { EquippedItem } from './equipped-item.entity';
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

  @Column({ name: 'current_life', default: 0 })
  currentLife: number;

  @Column({ name: 'current_mana', default: 0 })
  currentMana: number;

  @Column({ name: 'money', default: 100 })
  money: number;

  @ManyToOne(() => User, user => user.heroes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @ManyToOne(() => Season, season => season.heroes)
  @JoinColumn({ name: 'season_id' })
  season: Season;

  @Column({ name: 'season_id', nullable: false })
  seasonId: string;

  @OneToMany(() => HeroSkill, heroSkill => heroSkill.hero)
  heroSkills: HeroSkill[];

  @OneToMany(() => Inventory, inventory => inventory.hero)
  inventory: Inventory[];

  @OneToMany(() => EquippedItem, equippedItem => equippedItem.hero)
  equippedItems: EquippedItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 