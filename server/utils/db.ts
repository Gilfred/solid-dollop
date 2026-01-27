// server/utils/db.ts
import { PrismaClient } from '@@/prisma/generated/prisma-client';

// Singleton global pour éviter les multiples instances en serverless
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
