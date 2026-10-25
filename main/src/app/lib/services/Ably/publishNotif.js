import { ably } from "./server";

const NOTIFICATION_MESSAGES = {
  PAYMENT_FAILED:
    "Your payment could not be completed. Please check your order status.",

  PAYMENT_REVIEW_REQUIRED:
    "We are still verifying your payment. Please check your order status shortly.",

  ORDER_EXPIRED:
    "Your order reservation has expired. Please try placing your order again.",

  ORDER_FAILED:
    "We couldn't process your order. Please try again later.",
};

export async function publishCustomerNotification({
  customerId,
  code,
  orderId,
}) {
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
      orderId: orderId ?? null,
      createdAt: new Date().toISOString(),
    },
  });
}