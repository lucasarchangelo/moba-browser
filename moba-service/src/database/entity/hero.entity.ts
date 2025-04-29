import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { HeroSkill } from './hero-skill.entity';
import { Inventory } from './inventory.entity';
import { EquippedItem } from './equipped-item.entity';
import { HeroType } from '../enums/hero-type.enum';


@Entity('heroes')
export class Hero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: HeroType,
    default: HeroType.KNIGHT
  })
  type: HeroType;

  @Column({ default: 0 })
  baseHealth: number;

  @Column({ default: 0 })
  baseMana: number;

  @Column({ default: 0 })
  baseDamage: number;

  @Column({ default: 0 })
  baseArmor: number;

  @Column({ default: 0 })
  baseMagicResistance: number;

  @Column({ default: 0 })
  baseMovementSpeed: number;

  @Column({ default: 0 })
  baseAttackSpeed: number;

  @Column({ default: 0 })
  baseAttackRange: number;

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