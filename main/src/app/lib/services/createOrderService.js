"use server";
import { prisma } from '@/app/lib/prisma';


export const createorderService = async(data, email, name, SHIPPING) => {
  const {phone,address,area,landmark,city,state,pincode,payment,notes, items} = data;
  
  const isDuplicates = () => new Set(items.map(item => item.productId)).size !== items.length;
  if(isDuplicates()) throw new Error("Some products are duplicated, please try again");

  const colors = items.map(item => item.color).flat();


  // $ transaction $ //

  try {
    const res = await prisma.$transaction(async( tx) => {
        
      const updatePromises = colors.map(color => tx.productVariant.update({
        where: {
          id: color.colorId,
          availableMeters: {
            gte: color.quantity
          }
        },
        data: {
          availableMeters: {
            decrement: color.quantity
          }
        }
      })) ;

      await Promise.all(updatePromises);
          
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
        update: {} ,
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