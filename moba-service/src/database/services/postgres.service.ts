import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class PostgresService {
  private dataSource: DataSource;

  setDataSource(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  getDataSource(): DataSource {
    return this.dataSource;
  }

  async getQueryRunner() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    return queryRunner;
  }

  async executeQuery<T>(query: string, parameters?: any[]): Promise<T> {
    const queryRunner = await this.getQueryRunner();
    try {
      return await queryRunner.query(query, parameters);
    } finally {
      await queryRunner.release();
    }
  }

  async executeTransaction<T>(callback: (queryRunner: any) => Promise<T>): Promise<T> {
    const queryRunner = await this.getQueryRunner();
    await queryRunner.startTransaction();

    try {
      const result = await callback(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
} 