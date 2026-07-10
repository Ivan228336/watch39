import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Сохраняем в глобальную область и PrismaClient, и Pool
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
  pool: Pool;
};

// 1. Кэшируем пул соединений. Это спасет Supabase от таймаутов при Next.js HMR.
const pool =
  globalForPrisma.pool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5, // Ограничиваем подключения (важно для локальной разработки)
  });

// 2. Создаем адаптер на основе пула
const adapter = new PrismaPg(pool);

// 3. Создаем клиента (теперь адаптер строго обязателен в Prisma 7)
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV !== 'production' ? ['error'] : ['error'],
  });

// 4. Записываем в глобальную память для HMR
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
  globalForPrisma.pool = pool;
}