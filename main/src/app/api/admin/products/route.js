import { serializePrisma } from "@/app/helpers/serializePrisma";
import { ApiTryCatch } from "@/app/helpers/TryCatch";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { getFirstAdminProdListNotStatusBased, getFirstAdminProdListStatusBased, getMoreAdminProdListNotStatusBased, getMoreAdminProdListStatusBased } from "@/app/lib/services/adminProd";

export async function GET(req) {
  return ApiTryCatch(async () => {
    const searchParams = req.nextUrl.searchParams;
    const cursor = searchParams.get('cursor') || undefined;
    const search = searchParams.get('search') ?? '';
    const category = searchParams.get('category') ?? '';
    const status = searchParams.get('status') ?? '';

    if (cursor) {
      // Fetch more (paginated)
      if (status && status !== "All Status") {
        const result = await getMoreAdminProdListStatusBased(cursor, search, category, status);
        return resSuccess(serializePrisma(result), 200, true);
      } else {
        const result = await getMoreAdminProdListNotStatusBased(cursor, search, category);
        return resSuccess(serializePrisma(result), 200, true);
      }
    } else {
      // Fetch first page
      if (status && status !== "All Status") {
        const result = await getFirstAdminProdListStatusBased(search, category, status);
        return resSuccess(serializePrisma(result), 200, true);
      } else {
        const result = await getFirstAdminProdListNotStatusBased(search, category);
        return resSuccess(serializePrisma(result), 200, true);
      }
    }
  }, "getAdminProducts");
}
