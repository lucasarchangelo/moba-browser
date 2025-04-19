import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { CreateInitialSchemasMigration } from '../../../src/database/migrations/001-create-initial-schemas';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('CreateInitialSchemasMigration', () => {
  let module: TestingModule;
  let migration: CreateInitialSchemasMigration;
  let dataSource: DataSource;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'postgres',
            host: process.env.POSTGRES_HOST || 'localhost',
            port: parseInt(process.env.POSTGRES_PORT || '5432'),
            username: process.env.POSTGRES_USER || 'postgres',
            password: process.env.POSTGRES_PASSWORD || 'postgres',
            database: process.env.POSTGRES_DB || 'moba_test',
            autoLoadEntities: true,
            synchronize: false,
          }),
        }),
      ],
      providers: [CreateInitialSchemasMigration],
    }).compile();

    migration = module.get<CreateInitialSchemasMigration>(CreateInitialSchemasMigration);
    dataSource = module.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    if (dataSource.isInitialized) {
      const queryRunner = dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        // Drop all tables
        await queryRunner.query(`DROP TABLE IF EXISTS match_events CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS matches CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS equipped_items CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS inventories CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS hero_skills CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS items CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS skills CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS heroes CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS users CASCADE`);

        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      } finally {
        await queryRunner.release();
      }
    }
    await module.close();
  });

  beforeEach(async () => {
    if (!dataSource.isInitialized) {
      throw new Error('Database connection not initialized');
    }

    // Drop all tables before each test
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.query(`DROP TABLE IF EXISTS match_events CASCADE`);
      await queryRunner.query(`DROP TABLE IF EXISTS matches CASCADE`);
      await queryRunner.query(`DROP TABLE IF EXISTS equipped_items CASCADE`);
      await queryRunner.query(`DROP TABLE IF EXISTS inventories CASCADE`);
      await queryRunner.query(`DROP TABLE IF EXISTS hero_skills CASCADE`);
      await queryRunner.query(`DROP TABLE IF EXISTS items CASCADE`);
      await queryRunner.query(`DROP TABLE IF EXISTS skills CASCADE`);
      await queryRunner.query(`DROP TABLE IF EXISTS heroes CASCADE`);
      await queryRunner.query(`DROP TABLE IF EXISTS users CASCADE`);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  });

  it('should be defined', () => {
    expect(migration).toBeDefined();
  });

  describe('up', () => {
    it('should create all required tables', async () => {
      if (!dataSource.isInitialized) {
        throw new Error('Database connection not initialized');
      }

      await migration.up(dataSource);

      const tables = await dataSource.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `);
      const tableNames = tables.map(t => t.table_name);

      expect(tableNames).toContain('users');
      expect(tableNames).toContain('heroes');
      expect(tableNames).toContain('matches');
      expect(tableNames).toContain('items');
      expect(tableNames).toContain('skills');
      expect(tableNames).toContain('equipped_items');
      expect(tableNames).toContain('inventories');
      expect(tableNames).toContain('hero_skills');
      expect(tableNames).toContain('match_events');
    });

    it('should create indexes on tables', async () => {
      if (!dataSource.isInitialized) {
        throw new Error('Database connection not initialized');
      }

      await migration.up(dataSource);

      // Check users table indexes
      const userIndexes = await dataSource.query(`
        SELECT indexname, indexdef 
        FROM pg_indexes 
        WHERE tablename = 'users'
      `);
      expect(userIndexes.some(idx => idx.indexname === 'users_email_key')).toBe(true);

      // Check matches table indexes
      const matchIndexes = await dataSource.query(`
        SELECT indexname, indexdef 
        FROM pg_indexes 
        WHERE tablename = 'matches'
      `);
      expect(matchIndexes.some(idx => idx.indexname === 'idx_matches_hero_id')).toBe(true);
      expect(matchIndexes.some(idx => idx.indexname === 'idx_matches_hero_killer_id')).toBe(true);

      // Check match_events table indexes
      const matchEventIndexes = await dataSource.query(`
        SELECT indexname, indexdef 
        FROM pg_indexes 
        WHERE tablename = 'match_events'
      `);
      expect(matchEventIndexes.some(idx => idx.indexname === 'idx_match_events_match_id')).toBe(true);
      expect(matchEventIndexes.some(idx => idx.indexname === 'idx_match_events_hero_id')).toBe(true);
    });
  });

  describe('down', () => {
    it('should drop all tables', async () => {
      if (!dataSource.isInitialized) {
        throw new Error('Database connection not initialized');
      }

      // First create the tables
      await migration.up(dataSource);

      // Then drop them
      await migration.down(dataSource);

      // Check if tables were dropped
      const tables = await dataSource.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `);
      const tableNames = tables.map(t => t.table_name);

      expect(tableNames).not.toContain('users');
      expect(tableNames).not.toContain('heroes');
      expect(tableNames).not.toContain('matches');
      expect(tableNames).not.toContain('items');
      expect(tableNames).not.toContain('skills');
      expect(tableNames).not.toContain('equipped_items');
      expect(tableNames).not.toContain('inventories');
      expect(tableNames).not.toContain('hero_skills');
      expect(tableNames).not.toContain('match_events');
    });
  });
}); 