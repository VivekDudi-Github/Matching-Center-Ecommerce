"use server";

import { serializePrisma } from "@/app/hooks/serializePrisma";
import { TryCatch } from "@/app/hooks/TryCatch";
import { prisma } from "@/app/lib/prisma";
import { getShopProductsService, getShopSelectionService } from "../services/shopService";
import { resError, resSuccess } from "@/app/hooks/resObj";

export const getShopSelections = async () => {
  return await TryCatch(async () => {
    const {selections, priceRange} = await getShopSelectionService();
    return resSuccess({
        categories : serializePrisma(selections), 
        priceRange : serializePrisma(priceRange)
    });
  });
};

export const getProducts = async ({categoryId = '', outOfStock, minPrice, maxPrice,sort, searchText, cursor }) => { 
    if(searchText && searchText?.length > 15 ) return resError("search length is too long")

    return await TryCatch(async () => {
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