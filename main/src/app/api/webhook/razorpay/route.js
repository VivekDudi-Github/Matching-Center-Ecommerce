import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }


    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    const signCheck = crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expectedSignature, "hex"));

    if (!signCheck) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const eventData = JSON.parse(rawBody);
    const event = eventData.event;

    // 4. Handle events based on type
    switch (event) {
      case "payment.captured":
        const paymentEntity = eventData.payload.payment.entity;
        const orderId = paymentEntity.order_id;
        
        console.log(`Payment captured for Order: ${orderId}`);
        // TODO: Database updates here (e.g., set order status to "PAID")
        break;

      case "payment.failed":
        const failedPayment = eventData.payload.payment.entity;
        console.log(`Payment failed for Order: ${failedPayment.order_id}`);
        // TODO: Update database status to "FAILED"
        break;

      default:
        console.log(`Unhandled webhook event: ${event}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Webhook Handler Failed" }, { status: 500 });
  }
}
