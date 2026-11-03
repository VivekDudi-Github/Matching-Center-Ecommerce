
import "server-only";
import mailjet from "node-mailjet";

// todo - add the button link after the deployment in mails

export const sendPaySuccessMail = async (order, custumer) => {
  try {
    // fixed naming and items structure to show in mail
    let items = order.orderItems
    items = items.map(item => ({
        name : item.title,
        price: item.price,
        variants: item.color.map((c) => ({
          name : c.colorName,
          quantity: c.quantity
        }))
      })
    )
   

    const mail = mailjet.apiConnect(process.env.MAILJET_API_KEY, process.env.MILJET_SECERET_KEY);
    
    const res = await mail
  	.post("send", {'version': 'v3.1'})
  	.request({
      "SandboxMode": true,
      "Messages":[
        {
          "From": {
            "Email": "vivekdudi18coc@gmail.com",
            "Name": "Vivek"
          },
          "To": [
            {
              "Email": "vivekdudi18coc@gmail.com",
              "Name": "passenger 1"
            }
          ],
          "TemplateID": 8485353,
          "TemplateLanguage": true,
          "Subject": "Pay Success",
          "Variables": {
            "order_link": "http://localhost:3000/checkout/"+order.id,
            "items": items,
            "Amount": order.amount+order.shipping,
            "Order_Date": order.payment.updatedAt,
            "Payment_ID": order.payment.gatewayPaymentId,
            "customer_name": custumer.name,
            "order_ID": order.id
          }
        }
      ]
    })

  } catch (error) {
    console.log("error in sendPaySuccess mail:" , error)
  }
}

export const sendCancellationConfirmationMail = async(order, customer) => {
    try {
      const mail = mailjet.apiConnect(process.env.MAILJET_API_KEY, process.env.MILJET_SECERET_KEY);
    
    const res = await mail
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "",
            "Name": ""
          },
          "To": [
            {
              "Email": "passenger1@example.com",
              "Name": "passenger 1"
            }
          ],
          "TemplateID": 8487624,
          "TemplateLanguage": true,
          "Subject": "",
          "Variables": {
            "refund_amount": "undefined",
            "deductions": "undefined",
            "original_amount": "undefined",
            "currency": "undefined",
            "order_id": "undefined",
            "customer_name": "undefined"
          }
        }
      ]
    })
    } catch (error) {
      console.log("error in sendCancellationSuccessdMail confirm Mail") 
    }
}

export const sendCancellationMail = async () => {
  try {
    const mail = mailjet.apiConnect(process.env.MAILJET_API_KEY, process.env.MILJET_SECERET_KEY);
    
  
    const res = await mail
  	.post("send", {'version': 'v3.1'})
  	.request({
      "Messages":[
        {
          "From": {
            "Email": "",
            "Name": ""
          },
          "To": [
            {
              "Email": "passenger1@example.com",
              "Name": "passenger 1"
            }
          ],
          "TemplateID": 8487624,
          "TemplateLanguage": true,
          "Subject": "",
          "Variables": {
            "refund_amount": "undefined",
            "deductions": "undefined",
            "currency": "₹",
            "original_amount": "undefined",
            "order_id": "undefined",
            "customer_name": "undefined"
          }
        }
		  ]
    });

  } catch (error) {
    console.log("error in sendPaySuccess mail:" , error)
  }
}

export const sendDispatchInitiatedMail = async (order, custumer, address) => {
  try {
    const mail = mailjet.apiConnect(process.env.MAILJET_API_KEY, process.env.MILJET_SECERET_KEY);
    
  
    const res = await mail
  	.post("send", {'version': 'v3.1'})
  	.request({
      "Messages":[
        {
          "From": {
            "Email": "",
            "Name": ""
          },
          "To": [
            {
              "Email": "passenger1@example.com",
              "Name": "passenger 1"
            }
          ],
          "TemplateID": 8487564,
          "TemplateLanguage": true,
          "Subject": "",
          "Variables": {
            "tracking_id": "undefined",
            "courier_name": "undefined",
            "tracking_url": "undefined",
            "order_id": "undefined",
            "customer_name": "undefined"
          }
        }
      ]
    });

  } catch (error) {
    console.log("error in sendPaySuccess mail:" , error)
  }
}



// delivered success , order cancellation, 