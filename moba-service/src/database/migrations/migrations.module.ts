import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MigrationService } from './migration.service';
import { CreateAllTablesMigration } from './001-create-all-tables';

@Module({
  imports: [
    TypeOrmModule.forFeature([]), // This ensures the connection is available
  ],
  providers: [
    MigrationService,
    CreateAllTablesMigration,
  ],
  exports: [MigrationService],
})
export class MigrationsModule {} 