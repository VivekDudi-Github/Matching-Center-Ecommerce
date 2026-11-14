import { serializePrisma } from "@/app/helpers/serializePrisma";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { ApiTryCatch } from "@/app/helpers/TryCatch";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { fetchOrdersByCustomerIdService } from "@/app/lib/services/fetchOrderService";

export async function GET(req) {
  return ApiTryCatch(async () => {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user) {
      return resError("Please login to view orders", null, 401, true);
    }

    const userId = session?.user?.id;
    if (!userId) {
      return resError("User credential is missing", null, 400, true);
    }

    const searchParams = req.nextUrl.searchParams;
    const cursor = searchParams.get('cursor') || undefined;

    const result = await fetchOrdersByCustomerIdService({ customerId: userId, cursor });

    return resSuccess(serializePrisma(result), 200, true);
  }, "getUserOrders");
}
