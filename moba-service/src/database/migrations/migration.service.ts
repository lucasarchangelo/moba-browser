import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateAllTablesMigration } from './001-create-all-tables';
import { BaseMigration } from './base.migration';

@Injectable()
export class MigrationService implements OnModuleInit {
  private readonly migrations: BaseMigration[];

  constructor(private readonly dataSource: DataSource) {
    this.migrations = [
      new CreateAllTablesMigration(this.dataSource),
    ];
  }

  async onModuleInit() {
    await this.runMigrations();
  }

  private async runMigrations(): Promise<void> {
    if (!this.dataSource.isInitialized) {
      throw new Error('Database connection not initialized');
    }

    // Create migrations table if it doesn't exist
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS migrations (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE,
          applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Get applied migrations
      const appliedMigrations = await queryRunner.query(
        'SELECT name FROM migrations'
      );
      
      const appliedMigrationNames = new Set(appliedMigrations.map(m => m.name));

      // Run pending migrations
      for (const migration of this.migrations) {
        if (!appliedMigrationNames.has(migration.constructor.name)) {
          try {
            console.log(`Running migration: ${migration.constructor.name}`);
            await migration.up(this.dataSource);
            
            await queryRunner.query(
              'INSERT INTO migrations (name) VALUES ($1)',
              [migration.constructor.name]
            );
            
            console.log(`Successfully applied migration: ${migration.constructor.name}`);
          } catch (error) {
            console.error(`Error running migration ${migration.constructor.name}:`, error);
            throw error;
          }
        }
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
} 