"use server";

import { resError, resSuccess } from "@/app/hooks/resObj";
import { serializePrisma } from "@/app/hooks/serializePrisma";
import { TryCatch } from "@/app/hooks/TryCatch";
import { prisma } from "@/app/lib/prisma";

export const getProductById = async (id) => {
  if (!id) return resError("Product Id is missing");

  return await TryCatch(async () => {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        color: true,
        tags: true,
        category: true,
        images: true,
      },
    });
    return resSuccess(serializePrisma(product));
  });
};