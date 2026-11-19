import { PrismaClient } from "@/generated/prisma/client";
import {PrismaPg} from '@prisma/adapter-pg';
import { prismaExtension } from "./prismaExtension";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL_NON_POOLED,
    })
  }).$extends(prismaExtension);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
