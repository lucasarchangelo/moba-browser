import { EffectType } from '../enums/effect-type.enum';
import { EffectTarget } from '../enums/effect-target.enum';
import { StatType } from '../enums/stat-type.enum';

export interface Effect {
  type: EffectType;
  target: EffectTarget;
  value: number | string;
  stat?: StatType;
  duration?: number;
  chance?: number;
} 