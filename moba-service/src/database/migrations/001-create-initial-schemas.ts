import { DataSource } from 'typeorm';
import { BaseMigration } from './base.migration';

export class CreateInitialSchemasMigration extends BaseMigration {
  async up(dataSource: DataSource): Promise<void> {
    // Create tables using TypeORM's query runner
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create users table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          nickname VARCHAR(255) NOT NULL,
          blocked BOOLEAN DEFAULT FALSE,
          active BOOLEAN DEFAULT TRUE,
          lastLoginAt TIMESTAMP,
          role VARCHAR(50) DEFAULT 'user',
          avatarUrl VARCHAR(255),
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create heroes table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS heroes (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          type VARCHAR(50) NOT NULL,
          attributes JSONB NOT NULL,
          stats JSONB NOT NULL,
          imageUrl VARCHAR(255),
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create skills table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS skills (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          type VARCHAR(50) NOT NULL,
          effects JSONB NOT NULL,
          imageUrl VARCHAR(255),
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create hero_skills table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS hero_skills (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          heroId UUID NOT NULL REFERENCES heroes(id) ON DELETE CASCADE,
          skillId UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
          level INTEGER DEFAULT 1,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(heroId, skillId)
        )
      `);

      // Create items table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS items (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          type VARCHAR(50) NOT NULL,
          effects JSONB NOT NULL,
          imageUrl VARCHAR(255),
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create inventories table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS inventories (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          heroId UUID NOT NULL REFERENCES heroes(id) ON DELETE CASCADE,
          itemId UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
          quantity INTEGER DEFAULT 1,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(heroId, itemId)
        )
      `);

      // Create equipped_items table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS equipped_items (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          heroId UUID NOT NULL REFERENCES heroes(id) ON DELETE CASCADE,
          itemId UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
          slot VARCHAR(50) NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(heroId, itemId)
        )
      `);

      // Create matches table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS matches (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          heroId UUID NOT NULL,
          heroKillerId UUID,
          matchType VARCHAR(50) NOT NULL,
          result VARCHAR(50) NOT NULL,
          duration INTEGER NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (heroId) REFERENCES heroes(id) ON DELETE CASCADE,
          FOREIGN KEY (heroKillerId) REFERENCES heroes(id) ON DELETE SET NULL
        )
      `);

      // Create match_events table
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS match_events (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          matchId UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
          heroId UUID NOT NULL REFERENCES heroes(id) ON DELETE CASCADE,
          eventType VARCHAR(50) NOT NULL,
          eventData JSONB NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await queryRunner.commitTransaction();

      console.log('All tables and indexes created successfully');
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
      await queryRunner.query(`DROP TABLE IF EXISTS match_events`);
      await queryRunner.query(`DROP TABLE IF EXISTS matches`);
      await queryRunner.query(`DROP TABLE IF EXISTS equipped_items`);
      await queryRunner.query(`DROP TABLE IF EXISTS inventories`);
      await queryRunner.query(`DROP TABLE IF EXISTS hero_skills`);
      await queryRunner.query(`DROP TABLE IF EXISTS items`);
      await queryRunner.query(`DROP TABLE IF EXISTS skills`);
      await queryRunner.query(`DROP TABLE IF EXISTS heroes`);
      await queryRunner.query(`DROP TABLE IF EXISTS users`);

      await queryRunner.commitTransaction();
      console.log('All tables dropped successfully');
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
} 