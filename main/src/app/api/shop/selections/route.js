import { serializePrisma } from "@/app/helpers/serializePrisma";
import { ApiTryCatch } from "@/app/helpers/TryCatch";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { getShopSelectionService } from "@/app/lib/services/shopService";

export async function GET(req) {
  return ApiTryCatch(async () => {
    const { selections, priceRange } = await getShopSelectionService();
    return resSuccess({
      categories: serializePrisma(selections),
      priceRange: serializePrisma(priceRange)
    }, 200, true);
  }, "getShopSelections");
}
