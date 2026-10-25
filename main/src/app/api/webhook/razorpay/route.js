import { after, NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay"

export async function POST(request) {
  try {
    // we check the signature
    // we put data in after callback
    // we send 200 response back 
    
    // after callback runs

    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if(expectedSignature?.length !== signature?.length){
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
    // time-safe check
    const signCheck = crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expectedSignature, "hex"));

    if (!signCheck) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const eventData = JSON.parse(rawBody);

    after(bgOps(eventData));

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Webhook Handler Failed" }, { status: 500 });
  }
}


async function bgOps(eventData) {
    const event = eventData.event;
    const entity = eventData.payload.payment.entity;
    console.log("event data", event.event, eventData.payload.payment.entity);



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
    const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID , key_secret: process.env.RAZORPAY_KEY_SECRET });


    if(payment?.status === "Paid") {
      instance.payments.refund(entity?.id, payment.amount , "INR") ;
      await prisma.order.update({
        where: {
          id: order.id,
          payment: {
            razorpayOrderId: entity.order_id,
          }
        },
        data: {
          payment: {
            update: {
              status: "Paid",
            }
          }
        }
      })
    }

    

    // 4. Handle events based on type
    switch (event) {
      case "payment.authorized":
        if(!order) break;
        
        if(order.expireAt < new Date()) {
          await prisma.order.update({
            where: {
              id : entity.notes.orderId,
              payment: {
                razorpayOrderId: entity.order_id,
              }
            },
            data: {
              payment: {
                update: {
                  status: "Failed",
                }
              }
            }
          })

          // todo - provide user notification regarding expiry
          // add - way to create order even if payment is expired
          break;
        };  
        if(!payment || payment.status === "Paid") break;
        if(payment.razorpayOrderId !== entity.order_id) break;
        
        instance.payments.capture(entity?.id, payment.amount , "INR") ;  
        await prisma.order.update({
          where: {
            id : entity.notes.orderId,
            payment: {
              razorpayOrderId: entity.order_id,
            }
          },
          data: {
            isLocked: true,
            reverseAt: null,
            payment: {
              update: {
                status: "Processing",
              }
            }
          }
        })
        
        break;

      case "payment.failed":
        if(payment.status === "Processing") break;
        
        await prisma.order.update({
          where: {
            id: order.id ,
          },
          data: {
            isLocked: false,
            payment: {
              update: {
                status: "Failed",
              }
            }
          }
        });

        break;

      case "payment.captured":
       const order = await prisma.order.update({
          where: {
            id: order.id ,
          },
          data: {
            reverseAt: null,
            isLocked: true,
            payment: {
              update: {
                status: "Paid",
              }
            }
          }
        });

        if(!order) console.log("order not found");
        break;

      default:
        console.log(`Unhandled webhook event: ${event}`);
    }
}