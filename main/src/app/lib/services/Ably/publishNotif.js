import "server-only";
import { ablyServer as ably } from "./Ably";

const NOTIFICATION_MESSAGES = {
  OUT_OF_STOCK:
    "Unfortunately, we are out of stock for this product. Please try again later.",

  PAYMENT_SUCCESSFUL:
    "Your payment has been successfully completed. We will notify you once your order is ready for pickup.",

  PAYMENT_FAILED:
    "Your payment could not be completed. Please check your order status.",

  PAYMENT_REVIEW_REQUIRED:
    "We are still verifying your payment. Please check your order status shortly.",

  ORDER_EXPIRED:
    "Your order reservation has expired. Please try placing your order again.",

  ORDER_FAILED:
    "We couldn't process your order. Please try again.",

  INTERNAL_SERVER_ERROR:
    "Internal server error, please try again"
};

export async function publishCustomerNotification({
  customerId,
  code,
  storeOrderId,
}) {
  try {
    const message = NOTIFICATION_MESSAGES[code];
  
    if (!message) {
      throw new Error(`Unsupported notification code: ${code}`);
    }
  
    const channelName = `customer:${customerId}:notifications`;
  
    await ably.channels.get(channelName).publish({
      name: "notification",
      data: {
        code,
        message,
        storeOrderId: storeOrderId ?? null,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.log("error in publishing customer notification" , error);
  }
}