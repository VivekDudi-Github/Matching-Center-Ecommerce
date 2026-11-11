"use server";

import { serializePrisma } from "@/app/helpers/serializePrisma";
import { TryCatch } from "@/app/helpers/TryCatch";
import { prisma } from "@/app/lib/prisma";
import { getShopProductsService, getShopSelectionService } from "@/app/lib/services/shopService";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { shopFilterSchema } from "../validation/shopFilter.schema";

export const getShopSelections = async () => {
  return await TryCatch(async () => {
    const {selections, priceRange} = await getShopSelectionService();
    return resSuccess({
        categories : serializePrisma(selections), 
        priceRange : serializePrisma(priceRange)
    });
  });
};

export const getProducts = async (data) => { 
  return await TryCatch(async () => {

        if(typeof data?.categoryId === "string" && data?.categoryId.length > 0) {
            data.categoryId = data.categoryId?.split(",");
        } else {
            data.categoryId = [];
        }
        console.log("data", data.categoryId);

        const parsedData = shopFilterSchema.safeParse(data);
        if (!parsedData.success) {
            console.log(parsedData?.error?.issues)
            const parseError = parsedData?.error?.issues?.[0]?.message;
            return resError(parseError);
        }


        const {categoryId , outOfStock, minPrice, maxPrice,sort, searchText, cursor } = parsedData.data;

        const {products, newCursor} = await getShopProductsService({categoryId, outOfStock, minPrice, maxPrice,sort, searchText, cursor});

        return resSuccess({products : serializePrisma(products), newCursor});
    });
};
           

export const getCategories = async () => {
    return await TryCatch(async () => {
        const categories = await prisma.category.findMany({});
        return resSuccess(serializePrisma(categories));
    });
}