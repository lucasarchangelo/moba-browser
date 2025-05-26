import { HeroStatus } from '../database/enums/hero-status.enum';

interface TowerRewards {
  gold: number;
  xp: number;
  lifeDrain: number; // percentage per minute
  manaDrain: number; // percentage per minute
}

interface FountainRecovery {
  lifeRecovery: number; // percentage per minute
  manaRecovery: number; // percentage per minute
}

export const TOWER_REWARDS: Record<HeroStatus, TowerRewards> = {
  [HeroStatus.DEFENSIVE_TOWER]: {
    gold: 3.78, // 1,028 ÷ 272 minutes
    xp: 3.02,   // 822 ÷ 272 minutes
    lifeDrain: 0.294,
    manaDrain: 0.294
  },
  [HeroStatus.ATTACKING_TOWER]: {
    gold: 5.44, // 1,034 ÷ 190 minutes
    xp: 4.08,   // 775 ÷ 190 minutes
    lifeDrain: 0.421,
    manaDrain: 0.421
  },
  [HeroStatus.FOUNTAIN]: {
    gold: 0,
    xp: 0,
    lifeDrain: 0,
    manaDrain: 0
  },
  [HeroStatus.SHOP]: {
    gold: 0,
    xp: 0,
    lifeDrain: 0,
    manaDrain: 0
  }
};

export const FOUNTAIN_RECOVERY: FountainRecovery = {
  lifeRecovery: 5, // 5% per minute
  manaRecovery: 5  // 5% per minute
}; 