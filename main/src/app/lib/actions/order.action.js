"use server";

import { TryCatch } from "@/app/hooks/TryCatch";
import {  newOrderFormSchemaServer } from "../validation/newOrder.schema";
import {prisma} from "@/app/lib/prisma";
import { resError, resSuccess } from "@/app/hooks/resObj";
import z from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const SHIPPING = 80;

export const createorder = async(data) => {
  const session = await getServerSession(authOptions);

  if(!session || !session?.user) return resError("Please login to place order");

  const email = session.user.email;
  const name = session.user.name;

  const parsedData = newOrderFormSchemaServer.safeParse(data);
    if (!parsedData.success) {
      const {errors, properties} = z.treeifyError(parsedData.error);
      
      let parseError = [];
      if(errors.length) {
        console.log("parseError", parseError);
        return resError("Something went wrong, please try again");
      }
      Object.keys(properties).forEach(key => {
        if(properties[key]?.errors?.length) {
          parseError.push(properties[key].errors[0]);
        }
      });
      return resError (parseError);
    }

  return await TryCatch(async () => {
    const {phone,address,area,landmark,city,state,pincode,payment,notes, items} = data;
    
    const isDuplicates = () => new Set(items.map(item => item.productId)).size !== items.length;
    if(isDuplicates()) return resError("Some products are duplicated, please try again");

    const colors = items.map(item => item.color).flat();


    // $ transaction $ //

    try {
      const res = await prisma.$transaction(async( tx) => {
          
        const fetchedVariants = await prisma.productVariant.findMany({
          where: {
            OR: colors.map((color) => ({
              id: color.colorId,
              availableMeters: {
                gte: color.quantity
              }}
            ))
          }
        });
        console.log("fetchedVariants", fetchedVariants);
        
        const errorMessages = [];
        for (let color of colors) {
          const isMatch = fetchedVariants.find(variant => variant.id === color.colorId);
  
          if(!isMatch) {
            errorMessages.push(`Stock not available for ${color.colorName}, selected ${color.quantity}  `);
          }
        }
  
        if(errorMessages.length > 0) 
          return new Error(errorMessages.join("\n"));
      
  
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
            customerId: customer.id
          }
        });
  
  
        const newOrder = await tx.order.create({
          data: {
            customerId: customer.id,
            subtotal: subtotal,
            total: total,
            shipping: total > SHIPPING ? SHIPPING : 0,
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
          categoryId: product.categoryId,
          width: product.width,
          color: item.color.map(color => ({
            colorId: findColor(color.colorId, product).id,
            colorName: findColor(color.colorId, product).name,
            quantity: color.quantity,
            availableMeters: findColor(color.colorId, product).availableMeters
          }))
        }});
  
        await tx.orderItem.createMany({
          data: newOrderItems,
        })

        return newOrder;
      })    
      return resSuccess({orderId: res.id});
    } catch (error) {
      console.log("error in create order transaction::", error);
      throw new Error(error?.message ?? "Something went wrong, please try again");
    }
  
    

  })
}