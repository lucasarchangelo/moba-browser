import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Hero } from './hero.schema';
import { Item } from './item.schema';

@Entity('inventories')
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Hero)
  hero: Hero;

  @ManyToOne(() => Item)
  item: Item;

  @Column({ default: 1 })
  quantity: number;

  @Column()
  acquiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;
} 