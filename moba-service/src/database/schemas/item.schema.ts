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