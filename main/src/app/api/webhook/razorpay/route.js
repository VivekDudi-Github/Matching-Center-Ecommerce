import { NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay"

export async function POST(request) {
  try {
    console.log("event ", request, );
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

    request.waitUntil(bgOps(eventData));

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Webhook Handler Failed" }, { status: 500 });
  }
}


async function bgOps(eventData) {
  try {
    const event = eventData.event;
    const entity = eventData.payload.payment.entity;
    console.log("event data", eventData.payload.payment.entity);

    const order = await prisma.order.findUnique({
      where : {
        id: entity.notes.orderId,
        payment: {
          razorpayOrderId: entity.order_id,
        }
      },
      include: {
        payment: true,
        }
    });
    const payment = order?.payment;

    // 4. Handle events based on type
    switch (event) {
      case "payment.authorized":
        if(!order) break;
        
        const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID , key_secret: process.env.RAZORPAY_KEY_SECRET })

        if(order.expireAt < new Date()) {
          await prisma.order.update({
            where: {
              id : entity.notes.orderId,
              payment: {
                razorpayOrderId: entity.order_id,
              }
            },
            data: {
              expireAt: new Date(),
              payment: {
                update: {
                  status: "Failed",
                }
              }
            }
          })
          break;
        };      
        if(!payment || payment.status === "Paid") break;
        if(payment.razorpayOrderId !== entity.order_id) break;
        
        await prisma.order.update({
          where: {
            id : entity.notes.orderId,
            payment: {
              razorpayOrderId: entity.order_id,
            }
          },
          data: {
            reverseAt: null,
            payment: {
              update: {
                status: "Processing",
              }
            }
          }
        })
        instance.payments.capture(entity?.id, payment.amount , "INR") ;  
        
        break;

      case "payment.failed":
        
        await prisma.payment.update({
          where: {
            razorpayOrderId: entity.order_id,
          }, 
          data: {
            status: "Failed",
          }
        })
        break;

      case "payment.captured":
        await prisma.payment.update({
          where: {
            razorpayOrderId: entity.order_id,
          }, 
          data: {
            status: "Paid",
          }
        })
        break;

      default:
        console.log(`Unhandled webhook event: ${event}`);
    }
  } catch (error) {
    
  }
}