export interface Item {
  id: number;
  name: string;
  description: string;
  baseHealth: number;
  baseMana: number;
  baseArmor: number;
  baseMagicResistance: number;
  baseAccuracy: number;
  baseDamage: number;
  baseMagicDamage: number;
  isConsumable: boolean;
  slotType: 'head' | 'body' | 'legs' | 'feet' | 'weapon' | 'offhand' | 'accessory' | 'consumable';
  price: number;
  imageUrl?: string;
  effects?: {
    type: string;
    value: number;
    duration?: number;
  }[];
} 