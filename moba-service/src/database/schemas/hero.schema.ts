import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EquippedItem } from './equipped-item.schema';

@Entity('heroes')
export class Hero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  imageUrl: string;

  @Column('jsonb')
  attributes: {
    damage: number;
    armor: number;
    magicResistance: number;
    health: number;
    mana: number;
    strength: number;
    agility: number;
    intelligence: number;
  };

  @Column('jsonb')
  skills: {
    id: string;
    name: string;
    description: string;
    type: string;
    effects: any;
    imageUrl: string;
  }[];

  @OneToMany(() => EquippedItem, equippedItem => equippedItem.hero)
  equippedItems: EquippedItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 