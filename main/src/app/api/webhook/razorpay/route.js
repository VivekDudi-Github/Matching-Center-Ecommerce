import { after, NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay"
import { publishCustomerNotification } from "@/app/lib/services/Ably/publishNotif";

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
    const webhookEventId = request.headers.get('x-razorpay-event-id')
    

    after(bgOps(eventData, webhookEventId));
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Webhook Handler Failed" }, { status: 500 });
  }
}


async function bgOps(eventData, eventId) {
  try {
    const event = eventData.event;
    const entity = eventData.payload.payment.entity;
    console.log("event data", eventData, eventData.payload.payment.entity);

    const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID , key_secret: process.env.RAZORPAY_KEY_SECRET });


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
    if(!order){
      return;
    }

    const payment = order?.payment;
    // ignore if paid 
    if(payment?.status === "Paid") return;
    
    // 4. Handle events based on type
    switch (event) {
      case "payment.authorized":
        if(!order) break;
        if(payment.razorpayOrderId !== entity.order_id) break;

        
        if(order.expireAt < new Date()) {

          // updates the db for failure of payment on delay
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

          // pushes the message for the client
          await publishCustomerNotification({
            customerId: order.customerId,
            code: "ORDER_EXPIRED",
            orderId: order.id
          })
          
          break;
        };  

        if(!payment || payment.status === "Processing" ){
          // prevents the double payment by customer 
          // this happens when accidently user paid twice in succession or due to delay

          if(payment?.razorpayEventId !== eventId){
            
            await publishCustomerNotification({
              customerId: order.customerId,
              code: "PAYMENT_REVIEW_REQUIRED",
              orderId: order.id
            })
          } 
          break;
        }
       
        console.log("capturing the payment");
  
        instance.payments.capture(entity?.id, payment.amount , "INR") ;  

        // after initating the payment capture  
        // locing the payment and update the db 
        // prevents the accidently re-adding the stocks to db if capturing gets delayed
        console.log("updating order");
        
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
                razorpayEventId: eventId,
                razorpayPaymentId: entity.id,
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
        // removed the reversal time, and change the status

        await prisma.order.update({
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
            
        await publishCustomerNotification({
          customerId: order.customerId,
          code: "PAYMENT_SUCCESSFUL",
          orderId: order.id
        })
        
        break;

      default:
        console.log(`Unhandled webhook event: ${event}`);
    }
  } catch (error) {
    const customerId = eventData?.payload?.payment?.entity?.notes?.customerId ;


    if(customerId){
      await publishCustomerNotification({
          customerId: customerId,
          code: "INTERNAL_SERVER_ERROR",
          storeOrderId: eventData?.payload?.payment?.entity?.notes?.storeOrderId
      })  
    }

    console.error("Webhook callback error:", error);
  }
}