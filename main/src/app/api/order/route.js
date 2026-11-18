import { serializePrisma } from "@/app/helpers/serializePrisma";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { ApiTryCatch } from "@/app/helpers/TryCatch";
import { requireUser } from "@/app/helpers/auth";
import { fetchOrdersByCustomerIdService } from "@/app/lib/services/fetchOrderService";

export async function GET(req) {
  return ApiTryCatch(async (user) => {
    const searchParams = req.nextUrl.searchParams;
    const cursor = searchParams.get('cursor') || undefined;

    const result = await fetchOrdersByCustomerIdService({ customerId: user.id, cursor });

    return resSuccess(serializePrisma(result), 200, true);
  }, "getUserOrders", requireUser);
}
