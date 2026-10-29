"use client";
import { exfn } from '@/app/helpers/extractActions';
import { getTimeClient } from '@/app/helpers/getTimeClient';
import { getRazorpayOrder, verifYRazorPay } from '@/app/lib/controller/razorPayActions';
import { useSession } from 'next-auth/react';
import Script from 'next/script';
import Razorpay from 'razorpay';
import React, { useRef } from 'react'
import { toast } from 'react-toastify';

function RazorPayCheckout({order}) {
  const {data : session, status} = useSession();
  const rzp1Ref =  useRef(null);

  async function triggerRZP1(){
    try {
      
      
      if(!session || status !== "authenticated") {
        toast.error("you are not logged in, please login");
      }
      const razorpayOrderId = await exfn(() => getRazorpayOrder(order.id));
      const time  = await getTimeClient();

      if(!razorpayOrderId) toast.error("Something went wrong while getting orderId for you, please try again")
      if(!razorpayOrderId) return;
      console.log("razorpay-orderId" , razorpayOrderId);
      console.log("order-total", -(Date.parse(order.expireAt) - time )/1000 );

       const options = {
        "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        "amount": ((order.total*100) + (order.shipping * 100)),
        "currency": "INR",
        "name": "Matching Center",
        "description": "Gold Plan - Monthly Subscription",
        "image": "https://res.cloudinary.com/dorqb792j/image/upload/h_256,w_256/mc-logo.png",
        "order_id": razorpayOrderId,

        "prefill": {
          "name": session.user.name,
          "email": session.user.email,
          "contact": session.user.number
        },
        "timeout": -Math.floor((Date.parse(order.expireAt) - time)/ 1000),

        "notes": {
          "storeOrderId" : `${order.id}`,
          "razorpayOrderId" : `${razorpayOrderId}`,
          "cutomerId": `${order.customerId}`
        },
        
        "theme": { "color": "#3399cc" },
        "modal": {
          "confirm_close": true,
          "escape": false,
          "backdropclose": false,
          "animation": true,
          "ondismiss": function() {
            document.body.style.overflow=''
          }
        },
        "retry": { "enabled": true, "max_count": 4 }
      };


      const rzp1 = new (window).Razorpay(options);
      rzp1Ref.current = rzp1;
      
      rzp1.on("payment.failed", function(response) {
        console.log("400 error")
        console.error("Payment failed:", {
          code: response.error.code,
          description: response.error.description,
          source: response.error.source,
          step: response.error.step,
          reason: response.error.reason,
          order_id: response.error.metadata.order_id,
          payment_id: response.error.metadata.payment_id,
          });
        
      });
      
      rzp1.open();
    } catch (error) {

      toast.error("Something went wrong, please try again.");
      console.log("razorPay error", error);
    } 
  }

  
  return (
    <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    <button type='button' onClick={() => triggerRZP1() } className="w-full h-full" >
      Pay
    </button>
    </>
  )
}

export default RazorPayCheckout