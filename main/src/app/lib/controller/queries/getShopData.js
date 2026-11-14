import { serializePrisma } from "@/app/helpers/serializePrisma";
import { TryCatch } from "@/app/helpers/TryCatch";
import { prisma } from "@/app/lib/prisma";
import { resError, resSuccess } from "@/app/helpers/resObj";
import "server-only";

export const getCategories = async () => {
  return await TryCatch(async () => {
    const categories = await prisma.category.findMany({});
    return resSuccess(serializePrisma(categories));
  });
};
