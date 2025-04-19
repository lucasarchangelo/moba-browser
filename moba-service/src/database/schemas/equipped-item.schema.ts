import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Hero } from './hero.schema';
import { Item } from './item.schema';

@Entity('equipped_items')
export class EquippedItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Hero, hero => hero.equippedItems)
  hero: Hero;

  @ManyToOne(() => Item)
  item: Item;

  @Column()
  slot: number;

  @Column('jsonb')
  attributes: {
    damage?: number;
    armor?: number;
    magicResistance?: number;
    health?: number;
    mana?: number;
    strength?: number;
    agility?: number;
    intelligence?: number;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 