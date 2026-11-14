"use server";

import { resError, resSuccess } from "@/app/helpers/resObj";
import { serializePrisma } from "@/app/helpers/serializePrisma";
import { TryCatch } from "@/app/helpers/TryCatch";
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