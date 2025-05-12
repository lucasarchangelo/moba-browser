import { Injectable } from '@nestjs/common';
import { Effect } from '../database/interfaces/effect.interface';
import { EffectType } from '../database/enums/effect-type.enum';
import { EffectTarget } from '../database/enums/effect-target.enum';
import { StatType } from '../database/enums/stat-type.enum';

@Injectable()
export class EffectsService {
  processEffects(effects: Effect[], source: any, target: any) {
    const results = [];

    for (const effect of effects) {
      // Check if effect should be applied based on chance
      if (effect.chance && Math.random() > effect.chance) {
        continue;
      }

      const targetEntity = this.getTargetEntity(effect.target, source, target);
      
      if (!targetEntity) {
        continue;
      }

      switch (effect.type) {
        case EffectType.STAT_CHANGE:
          this.applyStatChange(effect, targetEntity);
          break;
        case EffectType.STATUS_EFFECT:
          this.applyStatusEffect(effect, targetEntity);
          break;
      }

      results.push({
        effect,
        target: targetEntity,
        success: true
      });
    }

    return results;
  }

  private getTargetEntity(target: EffectTarget, source: any, opponent: any) {
    switch (target) {
      case EffectTarget.SELF:
        return source;
      case EffectTarget.OPPONENT:
        return opponent;
      case EffectTarget.AREA:
        // Implement area effect logic
        return null;
      default:
        return null;
    }
  }

  private applyStatChange(effect: Effect, target: any) {
    if (!effect.stat || typeof effect.value !== 'number') {
      return;
    }

    const statValue = this.getStatValue(target, effect.stat);
    const newValue = statValue + effect.value;

    this.setStatValue(target, effect.stat, newValue);
  }

  private applyStatusEffect(effect: Effect, target: any) {
    if (typeof effect.value !== 'string') {
      return;
    }

    // Add status effect to target
    if (!target.statusEffects) {
      target.statusEffects = [];
    }

    target.statusEffects.push({
      type: effect.value,
      duration: effect.duration || 1
    });
  }

  private getStatValue(target: any, stat: StatType): number {
    switch (stat) {
      case StatType.HEALTH:
        return target.health || 0;
      case StatType.MANA:
        return target.mana || 0;
      case StatType.STRENGTH:
        return target.strength || 0;
      case StatType.DEXTERITY:
        return target.dexterity || 0;
      case StatType.INTELLIGENCE:
        return target.intelligence || 0;
      case StatType.ARMOR:
        return target.armor || 0;
      case StatType.MAGIC_RESISTANCE:
        return target.magicResistance || 0;
      case StatType.DAMAGE:
        return target.damage || 0;
      case StatType.MAGIC_DAMAGE:
        return target.magicDamage || 0;
      case StatType.ACCURACY:
        return target.accuracy || 0;
      default:
        return 0;
    }
  }

  private setStatValue(target: any, stat: StatType, value: number) {
    switch (stat) {
      case StatType.HEALTH:
        target.health = value;
        break;
      case StatType.MANA:
        target.mana = value;
        break;
      case StatType.STRENGTH:
        target.strength = value;
        break;
      case StatType.DEXTERITY:
        target.dexterity = value;
        break;
      case StatType.INTELLIGENCE:
        target.intelligence = value;
        break;
      case StatType.ARMOR:
        target.armor = value;
        break;
      case StatType.MAGIC_RESISTANCE:
        target.magicResistance = value;
        break;
      case StatType.DAMAGE:
        target.damage = value;
        break;
      case StatType.MAGIC_DAMAGE:
        target.magicDamage = value;
        break;
      case StatType.ACCURACY:
        target.accuracy = value;
        break;
    }
  }
} 