import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  constructor(private readonly connection: Connection) {}

  async onModuleDestroy() {
    await this.connection.close();
  }
}