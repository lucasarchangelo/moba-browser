import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ItemRarity } from '../enums/item-rarity.enum';
import { ItemSlotType } from '../enums/item-slot-type.enum';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column({ default: 0 })
  damage: number;

  @Column({ default: 0 })
  armor: number;

  @Column({ default: 0 })
  magicResistance: number;

  @Column({ default: 0 })
  health: number;

  @Column({ default: 0 })
  mana: number;

  @Column({ default: 0 })
  strength: number;

  @Column({ default: 0 })
  agility: number;

  @Column({ default: 0 })
  intelligence: number;

  @Column()
  imageUrl: string;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'enum', enum: ItemRarity })
  rarity: ItemRarity;

  @Column({ type: 'enum', enum: ItemSlotType })
  slotType: ItemSlotType;

  @Column({ default: false })
  isConsumable: boolean;

  @Column('jsonb')
  effects: Record<string, any>;
} 