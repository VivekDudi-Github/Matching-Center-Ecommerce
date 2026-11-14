import { serializePrisma } from "@/app/helpers/serializePrisma";
import { ApiTryCatch } from "@/app/helpers/TryCatch";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { getShopProductsService } from "@/app/lib/services/shopService";
import { shopFilterSchema } from "@/app/lib/validation/shopFilter.schema";

export async function GET(req) {
  return ApiTryCatch(async () => {
    const searchParams = req.nextUrl.searchParams;
    const data = {
      categoryId: searchParams.get('categoryId') ?? '',
      outOfStock: searchParams.get('outOfStock') === 'true',
      minPrice: searchParams.get('minPrice') ?? '',
      maxPrice: searchParams.get('maxPrice') ?? '',
      sort: searchParams.get('sort') ?? 'featured',
      searchText: searchParams.get('searchText') ?? '',
      cursor: searchParams.get('cursor') || undefined,
    };

    if (typeof data?.categoryId === "string" && data?.categoryId.length > 0) {
      data.categoryId = data.categoryId?.split(",");
    } else {
      data.categoryId = [];
    }

    const parsedData = shopFilterSchema.safeParse(data);
    if (!parsedData.success) {
      return resError(parsedData?.error?.issues?.[0]?.message, null, 400, true);
    }

    const { categoryId, outOfStock, minPrice, maxPrice, sort, searchText, cursor } = parsedData.data;

    const { products, newCursor } = await getShopProductsService({ categoryId, outOfStock, minPrice, maxPrice, sort, searchText, cursor });

    return resSuccess({ products: serializePrisma(products), newCursor }, 200, true);
  }, "getShopProducts");
}
