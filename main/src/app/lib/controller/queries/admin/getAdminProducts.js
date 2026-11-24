import { serializePrisma } from "@/app/helpers/serializePrisma";
import { TryCatch } from "@/app/helpers/TryCatch";
import { getFirstAdminProdListNotStatusBased, getFirstAdminProdListStatusBased, getMoreAdminProdListNotStatusBased, getMoreAdminProdListStatusBased } from "@/app/lib/services/api/adminProd";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { prisma } from "@/app/lib/prisma";
import "server-only";
import { requireAdmin } from "@/app/helpers/auth";

export const getMoreAdminProdList = async(cursor, search, category, status) => {
  if (!cursor) {
    return resError("Invalid or missing cursor position.", { list: [], newCursor: null, });
  }
  return await TryCatch(async () => {

    if(status && status !== "All Status") {
      const result = await getMoreAdminProdListStatusBased(cursor, search, category, status);
      return resSuccess(result);
    }else {
      const result = await getMoreAdminProdListNotStatusBased(cursor, search, category);
      return resSuccess(result);
    }
  }, requireAdmin);
}
export const getFirstAdminProdList = async( search, category, status) => {
  return await TryCatch( async () => {

    if(status && status !== "All Status") {
      const result = await getFirstAdminProdListStatusBased( search, category, status);
      return resSuccess(result);
    }else {
      const result = await getFirstAdminProdListNotStatusBased( search, category);
      return resSuccess(result);
    }
  }, requireAdmin);
}


export const getAdminProdById = async(id) => {
  if(!id) return  resError("Product Id is missing");

  return await TryCatch(async () => {
    const product = await prisma.product.findUnique({
      where: {
        id: id
      },
      include: {
        color: true,
        tags: true,
        category: true,
        images: true,
      },
    });
    return resSuccess(serializePrisma(product));
  }, requireAdmin);
}
