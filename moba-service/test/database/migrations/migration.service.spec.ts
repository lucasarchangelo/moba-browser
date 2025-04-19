import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { MigrationService } from '../../../src/database/migrations/migration.service';
import { MigrationsModule } from '../../../src/database/migrations/migrations.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('MigrationService', () => {
  let module: TestingModule;
  let migrationService: MigrationService;
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
        MigrationsModule,
      ],
    }).compile();

    migrationService = module.get<MigrationService>(MigrationService);
    dataSource = module.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    // Clean up the test database
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
        await queryRunner.query(`DROP TABLE IF EXISTS migrations CASCADE`);

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
    // Clear migrations table before each test
    if (dataSource.isInitialized) {
      const queryRunner = dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.query('DELETE FROM migrations');
      await queryRunner.release();
    }
  });

  it('should be defined', () => {
    expect(migrationService).toBeDefined();
  });

  it('should create migrations table if it does not exist', async () => {
    if (!dataSource.isInitialized) {
      throw new Error('Database connection not initialized');
    }

    // Drop migrations table if it exists
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query('DROP TABLE IF EXISTS migrations CASCADE');
    await queryRunner.release();

    // Run migrations
    await migrationService.onModuleInit();

    // Check if migrations table exists
    const result = await dataSource.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'migrations')"
    );
    expect(result[0].exists).toBe(true);
  });

  it('should run pending migrations', async () => {
    if (!dataSource.isInitialized) {
      throw new Error('Database connection not initialized');
    }

    // Run migrations
    await migrationService.onModuleInit();

    // Check if migration was recorded
    const appliedMigrations = await dataSource.query('SELECT name FROM migrations');
    expect(appliedMigrations).toHaveLength(1);
    expect(appliedMigrations[0].name).toBe('CreateInitialSchemasMigration');
  });

  it('should not run already applied migrations', async () => {
    if (!dataSource.isInitialized) {
      throw new Error('Database connection not initialized');
    }

    // Run migrations first time
    await migrationService.onModuleInit();

    // Run migrations second time
    await migrationService.onModuleInit();

    // Check if migration was recorded only once
    const appliedMigrations = await dataSource.query('SELECT name FROM migrations');
    expect(appliedMigrations).toHaveLength(1);
    expect(appliedMigrations[0].name).toBe('CreateInitialSchemasMigration');
  });
}); 