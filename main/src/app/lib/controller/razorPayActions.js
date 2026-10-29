"use server";
import { resError, resSuccess } from "@/app/helpers/resObj";
import Razorpay from "razorpay";
import { TryCatch } from "@/app/helpers/TryCatch";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { razorPayOrderService } from "../services/razorPayOrder";

const getRazorpayOrder = async (orderId) => {
  return await TryCatch(async () => {
    if(!orderId) return resError("Order id not found");

    const session = await getServerSession(authOptions);

    if(!session || !session.user) return resError("Please Login.")

    const razorpayId = await razorPayOrderService(orderId, session);

    console.log("razorpay-orderId", razorpayId);
    return razorpayId;
  })
}


const verifYRazorPay = async ({orderId, singature, paymentId}) => {
  return await TryCatch(async () => {
    if(!orderId) return resError("Order id not found");
    if(!singature) return resError("Signature not found");
    if(!paymentId) return resError("Payment id not found");

    const order = await prisma.payment.findUnique({
      where: {
        razorpayOrderId: orderId,
      }
    });

    if(!order) return resError("Order not found");

    const isValid = verifyPaymentSignature(orderId, paymentId, singature, process.env.RAZORPAY_KEY_SECRET);

    if(!isValid) return resError("Signature not valid");

    return resSuccess(true);


    function verifyPaymentSignature(orderId, paymentId, receivedSig, keySecret) {
      const body = orderId + '|' + paymentId;
      const expectedSig = crypto
      .createHmac('sha256', keySecret)
      .update(body)
      .digest('hex');
      // timing-safe comparison to prevent timing attacks
      return crypto.timingSafeEqual(
      Buffer.from(expectedSig, 'hex'),
      Buffer.from(receivedSig, 'hex')
      );
    }
  })
}

export { getRazorpayOrder, verifYRazorPay };


