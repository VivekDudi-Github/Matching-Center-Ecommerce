import { ApiTryCatch } from "@/app/helpers/TryCatch";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { requireUser } from "@/app/helpers/auth";
import { razorPayOrderService } from "@/app/lib/services/api/razorPayOrder";

export async function GET(req) {
  return ApiTryCatch(async (user) => {
    const searchParams = req.nextUrl.searchParams;
    const orderId = searchParams.get('orderId') ?? '';

    if (!orderId) return resError("Order id not found", null, 400, true);

    const razorpayId = await razorPayOrderService(orderId, { user });

    return resSuccess(razorpayId, 200, true);
  }, "getRazorpayOrder", requireUser);
}
