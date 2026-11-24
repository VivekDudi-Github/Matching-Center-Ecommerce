import "server-only";
import { ApiError } from "@/app/helpers/resObj";
import Razorpay from "razorpay";
import { prisma } from "@/app/lib/prisma";

export const razorPayOrderService = async(orderId, session) => {
    // find old order
    console.log("finding order");
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
        customerId: session.user.id
      },
      include: {
        payment: true,
      },
    });

    if(!order) throw new ApiError("Order not found", 404);
    if(order?.payment?.status === "Paid") throw new ApiError("Order already paid", 400);

    if(order?.payment?.gatewayOrderId) return order.payment.gatewayOrderId;

    const totalInPaise = order.total * 100 + order.shipping * 100;
    console.log("order paise amount",(order.total) + (order.shipping ) , totalInPaise);

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

    if(razorpayOrder?.error && razorpayOrder.error?.code === "BAD_REQUEST_ERROR") throw new ApiError(razorpayOrder?.error?.description , 400);

    if(razorpayOrder?.error && razorpayOrder.error?.code === "GATEWAY_ERROR") throw new ApiError(razorpayOrder?.error?.description , 400);

    if(razorpayOrder?.error && razorpayOrder.error?.code === "BAD_REQUEST_ERROR") throw new ApiError(razorpayOrder?.error?.description , 400);

    //create pament row and update it's gateway-orderId

    const payment = await prisma.payment.create({
      data: {
          gatewayOrderId: razorpayOrder.id,
          amount:  Number(order.total) + Number(order.shipping),
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

    return razorpayOrder.id;
}
