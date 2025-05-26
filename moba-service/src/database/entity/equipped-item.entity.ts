import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Hero } from './hero.entity';
import { Item } from './item.entity';
import { ItemSlotType } from '../enums/item-slot-type.enum';

@Entity('equipped_items')
export class EquippedItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Hero, hero => hero.equippedItems)
  hero: Hero;

  @ManyToOne(() => Item)
  item: Item;

  @Column({
    type: 'enum',
    enum: ItemSlotType
  })
  slot: ItemSlotType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 