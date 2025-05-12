import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { HeroSkill } from './hero-skill.entity';
import { MagicType } from '../enums/magic-type.enum';
import { Effect } from '../interfaces/effect.interface';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    name: 'magic_type',
    type: 'enum',
    enum: MagicType,
    default: MagicType.PHYSICAL
  })
  magicType: MagicType;

  @Column({ name: 'base_damage', default: 0 })
  baseDamage: number;

  @Column({ name: 'base_mana_cost', default: 0 })
  baseManaCost: number;

  @Column({ name: 'required_strength', default: 0 })
  requiredStrength: number;

  @Column({ name: 'required_dexterity', default: 0 })
  requiredDexterity: number;

  @Column({ name: 'required_intelligence', default: 0 })
  requiredIntelligence: number;

  @Column({ name: 'price', default: 0 })
  price: number;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column('jsonb', { name: 'effects', default: [] })
  effects: Effect[];

  @OneToMany(() => HeroSkill, heroSkill => heroSkill.skill)
  heroSkills: HeroSkill[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 