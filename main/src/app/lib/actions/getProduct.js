"use server";

import { serializePrisma } from "@/app/hooks/serializePrisma";
import { TryCatch } from "@/app/hooks/TryCatch";
import { prisma } from "@/app/lib/prisma";

export const getProduct = async (id) => {
  if (!id) throw new Error("Product Id is missing");
  return await TryCatch(async () => {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        color: true,
        tags: true,
        category: true,
        images: true,
      },
    });
    return serializePrisma(product);
  });
};