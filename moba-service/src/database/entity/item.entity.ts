import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ItemSlotType } from '../enums/item-slot-type.enum';
import { Effect } from '../interfaces/effect.interface';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'base_health', default: 0 })
  baseHealth: number;

  @Column({ name: 'base_mana', default: 0 })
  baseMana: number;

  @Column({ name: 'base_armor', default: 0 })
  baseArmor: number;

  @Column({ name: 'base_magic_resistance', default: 0 })
  baseMagicResistance: number;

  @Column({ name: 'base_accuracy', default: 0 })
  baseAccuracy: number;

  @Column({ name: 'base_damage', default: 0 })
  baseDamage: number;

  @Column({ name: 'base_magic_damage', default: 0 })
  baseMagicDamage: number;

  @Column({ name: 'is_consumable', default: false })
  isConsumable: boolean;

  @Column({ name: 'slot_type', type: 'enum', enum: ItemSlotType })
  slotType: ItemSlotType;

  @Column()
  price: number;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column('jsonb', { name: 'effects', default: [] })
  effects: Effect[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 