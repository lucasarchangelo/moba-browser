import { DataSource } from 'typeorm';
import { BaseMigration } from './base.migration';
import { ItemRarity } from '../enums/item-rarity.enum';
import { ItemSlotType } from '../enums/item-slot-type.enum';
import { Role } from '../../auth/enums/roles.enum';
import { MatchEventType } from '../enums/match-event-type.enum';
import { HeroType } from '../enums/hero-type.enum';

export class CreateAllTablesMigration extends BaseMigration {
  async up(dataSource: DataSource): Promise<void> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create users table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          nickname VARCHAR(255) NOT NULL,
          blocked BOOLEAN DEFAULT FALSE,
          active BOOLEAN DEFAULT TRUE,
          lastLoginAt TIMESTAMP,
          role VARCHAR(50) NOT NULL DEFAULT '${Role.USER}',
          avatarUrl VARCHAR(255),
          createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
          updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);

      // Create hero type enum
      await queryRunner.query(`
        CREATE TYPE hero_type AS ENUM (${Object.values(HeroType).map(t => `'${t}'`).join(', ')});
      `);

      // Create heroes table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS heroes (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          type hero_type NOT NULL DEFAULT '${HeroType.KNIGHT}',
          baseHealth INTEGER DEFAULT 0,
          baseMana INTEGER DEFAULT 0,
          baseDamage INTEGER DEFAULT 0,
          baseArmor INTEGER DEFAULT 0,
          baseMagicResistance INTEGER DEFAULT 0,
          baseMovementSpeed INTEGER DEFAULT 0,
          baseAttackSpeed INTEGER DEFAULT 0,
          baseAttackRange INTEGER DEFAULT 0,
          createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
          updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);

      // Create skills table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS skills (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          baseDamage INTEGER DEFAULT 0,
          baseCooldown INTEGER DEFAULT 0,
          baseManaCost INTEGER DEFAULT 0,
          baseRange INTEGER DEFAULT 0,
          baseAreaOfEffect INTEGER DEFAULT 0,
          createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
          updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);

      // Create hero_skills table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS hero_skills (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          heroId UUID REFERENCES heroes(id),
          skillId UUID REFERENCES skills(id),
          level INTEGER DEFAULT 0,
          damageMultiplier INTEGER DEFAULT 0,
          cooldownMultiplier INTEGER DEFAULT 0,
          manaCostMultiplier INTEGER DEFAULT 0,
          rangeMultiplier INTEGER DEFAULT 0,
          areaOfEffectMultiplier INTEGER DEFAULT 0,
          createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
          updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);

      // Create items table
      await queryRunner.query(`
        CREATE TYPE item_rarity AS ENUM (${Object.values(ItemRarity).map(r => `'${r}'`).join(', ')});
        CREATE TYPE item_slot_type AS ENUM (${Object.values(ItemSlotType).map(s => `'${s}'`).join(', ')});
        
        CREATE TABLE IF NOT EXISTS items (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          type VARCHAR(255) NOT NULL,
          damage INTEGER DEFAULT 0,
          armor INTEGER DEFAULT 0,
          magicResistance INTEGER DEFAULT 0,
          health INTEGER DEFAULT 0,
          mana INTEGER DEFAULT 0,
          strength INTEGER DEFAULT 0,
          agility INTEGER DEFAULT 0,
          intelligence INTEGER DEFAULT 0,
          imageUrl VARCHAR(255) NOT NULL,
          price INTEGER NOT NULL,
          rarity item_rarity NOT NULL,
          slotType item_slot_type NOT NULL,
          isConsumable BOOLEAN DEFAULT FALSE,
          effects JSONB NOT NULL DEFAULT '{}',
          createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
          updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);

      // Create inventories table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS inventories (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          heroId UUID REFERENCES heroes(id),
          itemId UUID REFERENCES items(id),
          quantity INTEGER DEFAULT 1,
          acquiredAt TIMESTAMP NOT NULL DEFAULT NOW(),
          createdAt TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);

      // Create equipped_items table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS equipped_items (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          heroId UUID REFERENCES heroes(id),
          itemId UUID REFERENCES items(id),
          slot INTEGER NOT NULL,
          createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
          updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);

      // Create matches table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS matches (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          heroId UUID REFERENCES heroes(id),
          heroKillerId UUID REFERENCES heroes(id),
          goldEarned INTEGER DEFAULT 0,
          experienceEarned INTEGER DEFAULT 0,
          createdAt TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);

      // Create match_events table
      await queryRunner.query(`
        CREATE TYPE match_event_type AS ENUM (${Object.values(MatchEventType).map(t => `'${t}'`).join(', ')});
        
        CREATE TABLE IF NOT EXISTS match_events (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          matchId UUID REFERENCES matches(id),
          eventType match_event_type NOT NULL,
          heroId UUID REFERENCES heroes(id),
          targetId UUID REFERENCES heroes(id),
          details JSONB NOT NULL DEFAULT '{}',
          createdAt TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async down(dataSource: DataSource): Promise<void> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Drop tables in reverse order to handle foreign key constraints
      await queryRunner.query('DROP TABLE IF EXISTS match_events');
      await queryRunner.query('DROP TYPE IF EXISTS match_event_type');
      await queryRunner.query('DROP TABLE IF EXISTS matches');
      await queryRunner.query('DROP TABLE IF EXISTS equipped_items');
      await queryRunner.query('DROP TABLE IF EXISTS inventories');
      await queryRunner.query('DROP TABLE IF EXISTS items');
      await queryRunner.query('DROP TYPE IF EXISTS item_slot_type');
      await queryRunner.query('DROP TYPE IF EXISTS item_rarity');
      await queryRunner.query('DROP TABLE IF EXISTS hero_skills');
      await queryRunner.query('DROP TABLE IF EXISTS skills');
      await queryRunner.query('DROP TABLE IF EXISTS heroes');
      await queryRunner.query('DROP TABLE IF EXISTS users');
      await queryRunner.query('DROP TYPE IF EXISTS hero_type');

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
} 