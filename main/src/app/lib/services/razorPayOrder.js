import "server-only";
import { resError, resSuccess } from "@/app/helpers/resObj";
import Razorpay from "razorpay";

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

    if(order?.payment?.razorpayOrderId) return resSuccess(order.payment.razorpayOrderId);

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


    const payment = await prisma.payment.create({
      data: {
          razorpayOrderId: razorpayOrder.id,
          amount: totalInPaise,
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