import "server-only";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { TryCatch } from "@/app/helpers/TryCatch";
import Razorpay from "razorpay";
import { prisma } from "@/app/lib/prisma";

export const razorPayRefundService = async(order) => {
  return await TryCatch(async () => {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const refundableAmount = (order.payment.amount) - ((order.payment.amount * 2)/100) - (order?.shipping || 0)    ;
    console.log("refundableAmount", order.payment.gatewayPaymentId, );

    const res = await razorpay.payments.refund(
      order.payment.gatewayPaymentId, {
        "amount": refundableAmount * 100,
        "speed": "normal",
    })
    console.log("res", res);

    if(res.error ){
      return resError(res.error.description);
    }

    await prisma.order.update({
      where: {id: order.id},
      data: {
        status: "Cancelled",
        payment: {
          update: {
            status : "Refunded",
            refundId: res.id
          }
        }
      }
    })

    return resSuccess(res.id);
  })
}
