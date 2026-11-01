import "server-only";
import mailjet from "node-mailjet";

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
              "Email": "passenger1@example.com",
              "Name": "passenger 1"
            }
          ],
          "TemplateID": 8485353,
          "TemplateLanguage": true,
          "Subject": "Pay Success",
          "Variables": {
            "items": items,
            "Amount": order.amount+order.shipping,
            "Order_Date": order.payment.updatedAt,
            "Payment_ID": order.payment.razorpayPaymentId,
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


export const sendPayErrorMail = async (order, custumer, paymentId) => {
  try {
    const mail = mailjet.apiConnect(process.env.MAILJET_API_KEY, process.env.MILJET_SECERET_KEY);
    
  
    const res = await mail
  	.post("send", {'version': 'v3.1'})
  	.request({
        "SandboxMode":true,
        "Messages":[
          {
            "From": {
              "Email": "vivekdudi18coc@gmail.com",
              "Name": "Vivek"
            },
            "To": [
              {
                "Email": "passenger1@example.com",
                "Name": "passenger 1"
              }
            ],
            "TemplateID": 8485353,
            "TemplateLanguage": true,
            "Subject": "Pay Success",
            "Variables": {
              "Payment_ID": order?.id ,
              "Amount": order?.amount + order?.shipping ,
              "order_ID": order?.id
            }
          }
        ]
      });

  } catch (error) {
    console.log("error in sendPaySuccess mail:" , error)
  }
}