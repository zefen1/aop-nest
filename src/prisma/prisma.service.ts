import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prisma: PrismaClient;
  private pool: Pool;

  constructor() {
    // 创建 PostgreSQL 连接池
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    // 使用 PostgreSQL 适配器创建 Prisma Client
    const adapter = new PrismaPg(this.pool);
    this.prisma = new PrismaClient({ adapter });
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
    await this.pool.end();
  }

  get client() {
    return this.prisma;
  }

  // 代理所有 Prisma Client 方法
  get user() {
    return this.prisma.user;
  }

  get course() {
    return this.prisma.course;
  }

  get userCourse() {
    return this.prisma.userCourse;
  }
}
