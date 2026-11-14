import { ApiTryCatch } from "@/app/helpers/TryCatch";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { razorPayOrderService } from "@/app/lib/services/razorPayOrder";

export async function GET(req) {
  return ApiTryCatch(async () => {
    const searchParams = req.nextUrl.searchParams;
    const orderId = searchParams.get('orderId') ?? '';

    if (!orderId) return resError("Order id not found", null, 400, true);

    const session = await getServerSession(authOptions);
    if (!session || !session.user) return resError("Please Login.", null, 401, true);

    const razorpayId = await razorPayOrderService(orderId, session);

    return resSuccess(razorpayId, 200, true);
  }, "getRazorpayOrder");
}
