import {NextResponse} from "next/server";


async function handler(req, res) {
  try {
    await prisma.$transaction(async (tx) => {
      let oldOrders = await tx.order.findMany({
        where: {
          reverseAt: {
            lte : new Date()
          } ,
          isLocked: false,
          OR : [
            {payment : 
              {status:{
                not: "Paid"
              }}},
            {payment : null}
          ],
        } , 
        include: {
          orderItems: {
            select : {
              color: true,
            }
          }
        }
      })
      if(!oldOrders || oldOrders.length === 0){
        return NextResponse.json({message: "No Stock found"}, {status: 200})
      }

      let colors = oldOrders.map(o => o.orderItems.map(oi => oi.color)).flat(3);

      for( const color of colors) {
        if(!color) continue;
        try {
          await tx.productVariant.update({
            where: {
              id: color.colorId
            },
            data: {
              availableMeters:{
                increment: color.quantity
              }
            }
          })
        } catch (error) {
          console.log(":: ColorId ::", color?.colorId);
          console.log(":: Error in restocking ::", error);
        }

      }

      for (const order of oldOrders) {
        await tx.order.update({
          where: {
            id: order.id,
            isLocked: false,
          },
          data: {
            reverseAt: null
          }
        })
      }
    }
  )

    return NextResponse.json({status: 200})
  } catch (error) {
    console.log("restock error", error);
    return NextResponse.json("error", {status: 500})
  }
}


export {handler as POST}