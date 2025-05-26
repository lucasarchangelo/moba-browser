export enum ItemSlotType {
  HEAD = 'HEAD',
  CHEST = 'CHEST',
  LEGS = 'LEGS',
  FEET = 'FEET',
  WEAPON = 'WEAPON',
  ACCESSORY = 'ACCESSORY'
}

export interface Item {
  id: string;
  name: string;
  description: string;
  slotType: ItemSlotType;
  imageUrl: string;
  isConsumable: boolean;
  quantity?: number;
}

export interface EquippedItem {
  id: string;
  heroId: string;
  itemId: string;
  slot: ItemSlotType;
  createdAt: Date;
}

export interface HeroAttributes {
  strength: number;
  dexterity: number;
  intelligence: number;
  baseHealth: number;
  baseMana: number;
  baseArmor: number;
  baseMagicResistance: number;
  baseAccuracy: number;
  baseDamage: number;
  baseMagicDamage: number;
  currentLife: number;
  currentMana: number;
}

export interface Hero {
  id: string;
  name: string;
  description: string;
  level: number;
  attributes: HeroAttributes;
  money: number;
  userId: string;
  seasonId: string;
  createdAt: string;
  updatedAt: string;
} 