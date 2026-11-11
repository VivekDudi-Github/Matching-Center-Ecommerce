import "server-only";
import { resError, resSuccess } from "@/app/helpers/resObj";
import Razorpay from "razorpay";
import { prisma } from "@/app/lib/prisma";

export const razorPayOrderService = async(orderId, session) => {
    // find old order
    
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
        customerId: session.user.id
      },
      include: {
        payment: true,
      },
    });

    if(!order) return resError("Order not found");
    if(order?.payment?.status === "Paid") return resError("Order already paid");

    if(order?.payment?.gatewayOrderId) return resSuccess(order.payment.gatewayOrderId);

    const totalInPaise = order.total * 100 + order.shipping * 100;

    // create instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: totalInPaise,
      currency: "INR",
      receipt: `order_${order.id}`,
      payment_capture: false,
      notes: {
        customerId : order.customerId,
        orderId: order.id,
      }
    });

    if(razorpayOrder?.error && razorpayOrder.error?.code === "BAD_REQUEST_ERROR") return resError(razorpay.error.description);

    if(razorpayOrder?.error && razorpayOrder.error?.code === "GATEWAY_ERROR") return resError(razorpay.error.description);
    
    if(razorpayOrder?.error && razorpayOrder.error?.code === "BAD_REQUEST_ERROR") return resError(razorpay.error.description);

    //create pament row and update it's gateway-orderId
    const payment = await prisma.payment.create({
      data: {
          gatewayOrderId: razorpayOrder.id,
          amount: order.total + order.shipping,
          status: "Pending",
          method: "UPI",
          order: {
            connect: {
              id : order.id
            }
          },
          customer: {
            connect: {
              id : order.customerId
            }
          },
        }
      }
    )

    return resSuccess(razorpayOrder.id);

}

export const razorPayRefundService = async(order) => {
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
    where: {id},
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
 
  return res.id;
}