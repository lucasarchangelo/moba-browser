import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Hero } from './hero.entity';
import { Item } from './item.entity';

@Entity('inventories')
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Hero, hero => hero.inventory)
  @JoinColumn({ name: 'hero_id' })
  hero: Hero;

  @Column({ name: 'hero_id' })
  heroId: string;

  @ManyToOne(() => Item)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @Column({ name: 'item_id' })
  itemId: string;

  @Column({ default: 1 })
  quantity: number;

  @Column({ name: 'acquired_at' })
  acquiredAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
} 