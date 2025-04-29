import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Hero } from './hero.entity';
import { Item } from './item.entity';

@Entity('inventories')
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Hero, hero => hero.inventory)
  @JoinColumn({ name: 'heroId' })
  hero: Hero;

  @Column()
  heroId: string;

  @ManyToOne(() => Item)
  @JoinColumn({ name: 'itemId' })
  item: Item;

  @Column()
  itemId: string;

  @Column({ default: 1 })
  quantity: number;

  @Column()
  acquiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;
} 