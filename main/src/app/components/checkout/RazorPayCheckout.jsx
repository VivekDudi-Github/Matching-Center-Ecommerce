import React from 'react'

function RazorPayCheckout() {
  var options = {
    "key": "YOUR_KEY_ID",
    "amount": "50000",
    "currency": "INR",
    "name": "Acme Corp",
    "description": "Gold Plan - Monthly Subscription",
    "image": "https://example.com/your_logo.png",
    "order_id": "order_9A33XWu170gUtm", // from Step 1
    "handler": function(response) {
    // Send ALL THREE fields to your server for verification (Step 3)

    fetch("/payment/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_order_id: response.razorpay_order_id,
    razorpay_signature: response.razorpay_signature
    })
    });
    },
    "prefill": {
    "name": "Customer Name",
    "email": "customer@example.com",
    "contact": "+919876543210"
    },
    "notes": { "address": "Your Office" },
    "theme": { "color": "#3399cc" },
    "modal": {
    "confirm_close": true,
    "escape": false,
    "backdropclose": false,
    "animation": true
    },
    "retry": { "enabled": true, "max_count": 4 }
  };

  var rzp1 = new Razorpay(options);
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
    // Show the error to the customer and offer a retry.
    });
    document.getElementById("rzp-button1").onclick = function(e) {
    rzp1.open();
    e.preventDefault();
  }

  
  return (
    <>
    <button id="rzp-button1">Pay</button>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <script>
        
      </script>
    </>
  )
}

export default RazorPayCheckout