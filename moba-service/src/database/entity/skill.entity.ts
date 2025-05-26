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

  @Column({ name: 'base_damage', type: 'int', default: 0 })
  baseDamage: number;

  @Column({ name: 'base_mana_cost', type: 'int', default: 0 })
  baseManaCost: number;

  @Column({ name: 'required_strength', type: 'int', default: 0 })
  requiredStrength: number;

  @Column({ name: 'required_dexterity', type: 'int', default: 0 })
  requiredDexterity: number;

  @Column({ name: 'required_intelligence', type: 'int', default: 0 })
  requiredIntelligence: number;

  @Column({ name: 'price', type: 'int', default: 0 })
  price: number;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ name: 'effects', type: 'jsonb', nullable: true })
  effects: Effect[];

  @OneToMany(() => HeroSkill, heroSkill => heroSkill.skill)
  heroSkills: HeroSkill[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 