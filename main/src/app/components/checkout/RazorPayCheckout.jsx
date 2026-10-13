"use client";
import { exfn } from '@/app/hooks/extractActions';
import { getRazorpayOrder, verifYRazorPay } from '@/app/lib/controller/razorPayActions';
import { useSession } from 'next-auth/react';
import Script from 'next/script';
import Razorpay from 'razorpay';
import React from 'react'
import { toast } from 'react-toastify';

function RazorPayCheckout({order}) {
  const {data : session, status} = useSession();
  
  async function triggerRZP1(){
    try {
      const orderId = await exfn(() => getRazorpayOrder(order.id));

       const options = {
        "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        "amount": order.total*100,
        "currency": "INR",
        "name": "Matching Center",
        "description": "Gold Plan - Monthly Subscription",
        "image": "https://res.cloudinary.com/dorqb792j/image/upload/h_256,w_256/mc-logo.png",
        "order_id": orderId,

        "prefill": {
          "name": session.user.name,
          "email": session.user.email,
          "contact": session.user.number
        },
        
        "theme": { "color": "#3399cc" },
        "modal": {
          "confirm_close": true,
          "escape": false,
          "backdropclose": false,
          "animation": true
          },
        "retry": { "enabled": true, "max_count": 4 }
      };


      const rzp1 = new (window).Razorpay(options);
      rzp1.open();
      
      rzp1.on("payment.failed", function(response) {
      console.error("Payment failed:", {
        code: response.error.code,
        description: response.error.description,
        source: response.error.source,
        step: response.error.step,
        reason: response.error.reason,
        order_id: response.error.metadata.order_id,
        payment_id: response.error.metadata.payment_id,
        });
      toast.error(response.error)
    });
    } catch (error) {
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