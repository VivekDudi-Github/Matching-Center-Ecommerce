'use server';

import { serializePrisma } from "@/app/hooks/serializePrisma";
import { TryCatch } from "@/app/hooks/TryCatch";
import { getFirstAdminProdListNotStatusBased, getFirstAdminProdListStatusBased, getMoreAdminProdListNotStatusBased, getMoreAdminProdListStatusBased } from "../services/adminProd";
import { resError, resSuccess } from "@/app/hooks/resObj";

export const getMoreAdminProdList = async(cursor, search, category, status) => { 
  if (!cursor) {
    return resError("Invalid or missing cursor position.", { list: [], newCursor: null, });
  }
  return await TryCatch(async () => {

    if(status && status !== "All Status") {
      return resSuccess(
        await getMoreAdminProdListStatusBased(cursor, search, category, status)
      );
    }else {
      return resSuccess(
        await getMoreAdminProdListNotStatusBased(cursor, search, category)
      );
    }
  });
}
export const getFirstAdminProdList = async( search, category, status) => {
  return await TryCatch( async () => {
  
    if(status && status !== "All Status") {
      return await getFirstAdminProdListStatusBased( search, category, status);
    }else {
      return await getFirstAdminProdListNotStatusBased( search, category);
    }
  });
}


export const getAdminProdById = async(id) => {
  if(!id) return  resError("Product Id is missing");
  
  return await TryCatch(async () => {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id)
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
}