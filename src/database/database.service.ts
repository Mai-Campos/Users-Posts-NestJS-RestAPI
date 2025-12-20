import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool: Pool;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    this.pool = new Pool({
      host: this.config.get<string>('DB_HOST'),
      port: this.config.get<number>('DB_PORT'),
      user: this.config.get<string>('DB_USER'),
      password: this.config.get<string>('DB_PASSWORD'),
      database: this.config.get<string>('DB_NAME'),
      max: 10,
      idleTimeoutMillis: 30000,
    });

    await this.pool.query('SELECT 1');
    this.logger.log('PostgreSQL connected');
  }

  async onModuleDestroy() {
    await this.pool.end();
    this.logger.log('PostgreSQL disconnected');
  }
}
