"use server";
import { resError, resSuccess } from "@/app/hooks/resObj";
import Razorpay from "razorpay";

const razorpayAction = async (orderId) => {
  return await TryCatch(async () => {
    if(!orderId) return resError("Order id not found");

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        payment: true,
      },
    });

    if(!order) return resError("Order not found");
    if(order?.payment?.status === "Paid") return resError("Order already paid");

    if(order?.payment?.razorpayOrderId) return resSuccess(order.payment.razorpayOrderId);

    const totalInPaise = order.total * 100;

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

    if(razorpayOrder?.error && razorpayOrder.error?.code === "BAD_REQUEST_ERROR") return resError("Something went wrong, please try again");

    if(razorpayOrder?.error && razorpayOrder.error?.code === "GATEWAY_ERROR") return resError("Gateway error, please try again");
    
    if(razorpayOrder?.error && razorpayOrder.error?.code === "BAD_REQUEST_ERROR") return resError("Internal server error, please try again");


    const payment = await prisma.payment.create({
      data: {
          razorpayOrderId: razorpayOrder.id,
          amount: totalInPaise,
          status: "Pending",
          method: "UPI",
          orderId: order.id,
          customerId: order.customerId
      }
    })


    return resSuccess(razorpayOrder.id);
  })
}

