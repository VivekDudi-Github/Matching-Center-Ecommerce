import { PrismaClient } from "@/generated/prisma/client";
import {PrismaPg} from '@prisma/adapter-pg';

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({
    adapter: new PrismaPg({
      database: process.env.DATABASE_URL_NON_POOLED,
    })
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
