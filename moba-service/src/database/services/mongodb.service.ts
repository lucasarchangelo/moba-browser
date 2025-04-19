import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  private dataSource: DataSource;

  setDataSource(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  getDataSource(): DataSource {
    return this.dataSource;
  }

  getRepository<T>(entity: new () => T) {
    return this.dataSource.getRepository(entity);
  }
} 