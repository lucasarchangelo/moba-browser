import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MigrationService } from './migration.service';
import { CreateInitialSchemasMigration } from './001-create-initial-schemas';

@Module({
  imports: [
    TypeOrmModule.forFeature([]), // This ensures the connection is available
  ],
  providers: [
    MigrationService,
    CreateInitialSchemasMigration,
  ],
  exports: [MigrationService],
})
export class MigrationsModule {} 