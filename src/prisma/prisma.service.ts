import {
  INestApplication,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';

export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleDestroy() {
    await this.$disconnect();
  }
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    try {
      this.$on('beforeExit', async () => {
        await app.close();
      });
    } catch (error) {
      HandleException(error);
    }
  }
}
