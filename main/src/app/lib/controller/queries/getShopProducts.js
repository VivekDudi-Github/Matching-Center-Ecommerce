import { serializePrisma } from "@/app/helpers/serializePrisma";
import { TryCatch } from "@/app/helpers/TryCatch";
import { getShopProductsService } from "@/app/lib/services/api/shopService";
import { shopFilterSchema } from "@/app/lib/validation/shopFilter.schema";
import { resError, resSuccess } from "@/app/helpers/resObj";
import "server-only";

export const getShopProducts = async (data) => {
  return await TryCatch(async () => {
    if (typeof data?.categoryId === "string" && data?.categoryId.length > 0) {
      data.categoryId = data.categoryId?.split(",");
    } else {
      data.categoryId = [];
    }

    const parsedData = shopFilterSchema.safeParse(data);
    if (!parsedData.success) {
      return resError(parsedData?.error?.issues?.[0]?.message);
    }

    const { categoryId, outOfStock, minPrice, maxPrice, sort, searchText, cursor } = parsedData.data;

    const { products, newCursor } = await getShopProductsService({ categoryId, outOfStock, minPrice, maxPrice, sort, searchText, cursor });

    return resSuccess({ products: serializePrisma(products), newCursor });
  });
};
