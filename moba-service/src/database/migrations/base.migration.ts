import { DataSource } from 'typeorm';

export interface Migration {
  up(dataSource: DataSource): Promise<void>;
  down(dataSource: DataSource): Promise<void>;
}

export abstract class BaseMigration implements Migration {
  constructor(protected readonly dataSource: DataSource) {}

  abstract up(dataSource: DataSource): Promise<void>;
  abstract down(dataSource: DataSource): Promise<void>;
} 