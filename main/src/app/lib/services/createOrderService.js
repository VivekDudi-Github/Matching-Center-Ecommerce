import "server-only";
import { resError } from '@/app/helpers/resObj';
import { prisma } from '@/app/lib/prisma';


export const createorderService = async(data, email, name, SHIPPING) => {
  const {phone,address,area,landmark,city,state,pincode,payment,notes, items} = data;
  
  const isDuplicates = () => new Set(items.map(item => item.productId)).size !== items.length;
  if(isDuplicates()) throw new Error("Some products are duplicated, please try again");

  const colors = items.map(item => item.color).flat();

  const isPendingOrder = await prisma.order.findFirst({
    where: {
      customer: {
        email: email
      },
      expireAt : {
        gt : new Date()
      }
    },
    select: {
      id: true
    }
  })

  if(isPendingOrder) throw new Error("There is alreadya pending order by you, please pay or cancel it.");
  

  // $ transaction $ //

  try {
    const res = await prisma.$transaction(async( tx) => {
        
      const updatePromises = colors.map(color => tx.$executeRaw`
          UPDATE "ProductVariant"
          SET 
            "availableMeters" = "availableMeters" - ${color.quantity},
            "isLowStock" = ("availableMeters" - ${color.quantity}) <= "lowstock"
          WHERE "id" = ${color.colorId}
            AND "availableMeters" >= ${color.quantity}
        `
      );

      const results = await Promise.all(updatePromises);

      const allSucceeded = results.every(rowsAffected => rowsAffected > 0);

      if (!allSucceeded) {
        throw new Error("Transaction rolled back: One or more items are out of stock!");
      }

      const products = await tx.product.findMany({
        where: {
          id: {
            in : items.map(item => item.productId) , 
          },
          isPublished : true
        }, 
        include: {
          color: true,
          category: true,
          images: {
            where: {
              displayOrder: 0
            }
          }
        }
      }) ;
      
      if(products.length !== items.length) 
        throw new Error("Some products not found, try reloading the page.");


      const subtotal = items.reduce((acc, item) => 
        acc + products.find(p => p.id === item.productId).originalPrice
          * item.color.reduce((acc, color) => 
          acc + color.quantity, 0), 0);
      
      const total = items.reduce((acc, item) => 
        acc + products.find(p => p.id === item.productId).price
          * item.color.reduce((acc, color) => 
          acc + color.quantity, 0), 0);

      const customer = await tx.customer.upsert({
        where: {
          email: email,
        }, 
        update: {
          number: phone
        } ,
        create: {
          name: name,
          number: phone,
          email: email,
          verified: false,
        }
      });

      const newAddress = await tx.address.create({
        data : {
          address: address,
          city : city,
          state: state,
          pincode: pincode,
          area: area,
          landmark: landmark,
          customerId: customer.id,
        }
      });


      const newOrder = await tx.order.create({
        data: {
          customerId: customer.id,
          subtotal: subtotal,
          total: total,
          shipping: total > SHIPPING ? SHIPPING : 0,
          notes: notes,
          addressId: newAddress.id,
        }
      });

      const findColor = (colorId, product) => product.color.find(c => c.id === colorId);
      
      const newOrderItems = items.map((item, i) => {
        const product = products.find(p => p.id === item.productId);
        return {
        productId: item.productId,
        title: product.title,
        originalPrice: product.originalPrice,
        price: product.price,
        orderId: newOrder.id,
        categoryName: product.category.name,
        imageId: product.images[0].id,
        pattern: product.pattern ,
        width: product.width,
        color: item.color.map(color => ({
          colorId: findColor(color.colorId, product).id,
          colorName: findColor(color.colorId, product).name,
          quantity: color.quantity,
          hex: findColor(color.colorId, product).hex,
          availableMeters: findColor(color.colorId, product).availableMeters
        }))
      }});

      await tx.orderItem.createMany({
        data: newOrderItems,
      })


      return newOrder;
    }, {
      timeout: 20000
    })    
    return res.id;
  } catch (error) {
    console.log("error in create order transaction::", error);
    throw new Error(error?.message ?? "Something went wrong, please try again");
  }
}

export const orderCancelService = async (order,session) => {
  if(order.status === "Cancelled") return;
  
  const orderExpiry = Date.parse(order.expireAt);
  if((order?.payment?.status === "Paid" || order?.payment?.status === "Processing") && order.status === "Pending" ){
      await prisma.order.update({
        where: {
          id : order.id
        } , 
        data: {
          status : "CancelRequested"
        }
      })
      return;
  }

  if(orderExpiry  <= Date.now()){
    return;
  }else {
  
    await prisma.$transaction(async (tx) => {

      const colors = order.orderItems.flatMap((item) => item.color).flat();    
     
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

      await prisma.order.update({
        where : {
          id : order.id
        }, 
        data: {
          reverseAt: null,
          status: "Cancelled",
          expireAt: new Date()
        }
      })
    }
  )
  }
  
}