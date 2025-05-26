import { EffectType } from '../enums/effects/effect-type.enum';
import { EffectTarget } from '../enums/effects/effect-target.enum';
import { StatType } from '../enums/effects/effec-stat-type.enum';

export interface Effect {
  type: EffectType;
  target: EffectTarget;
  value: number | string;
  stat?: StatType;
  duration?: number;
  chance?: number;
} 