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
      
      if(errors.length) {
        console.log("parseError", parseError);
        return resError("Something went wrong, please try again");
      }
      let parseError = [];
      Object.keys(properties).forEach(key => {
        if(properties[key]?.errors?.length) {
          parseError.push(properties[key].errors[0]);
        }
      });
      return resError (parseError);
    }

  return await TryCatch(async () => {
    const {phone,address,area,landmark,city,state,pincode,payment,notes, items} = data;
    
    const colors = items.map(item => item.color).flat();
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

    if(errorMessages.length > 0) {
      return resError(errorMessages.join("\n"));
    }

    

    const products = await prisma.product.findMany({
      where: {
        id: {
          in : items.map(item => item.productId)
        }
      }, 
      include: {
        color: true,
        category: true,
      }
    }) ;

    if(products.length !== items.length) 
      return resError("Some products not found, try reloading the page.");


    const subtotal = items.reduce((acc, item) => 
      acc + products.find(p => p.id == item.productId).originalPrice
        * item.color.reduce((acc, color) => 
        acc + color.quantity, 0), 0);
    
    const total = items.reduce((acc, item) => 
      acc + products.find(p => p.id == item.productId).price
        * item.color.reduce((acc, color) => 
        acc + color.quantity, 0), 0);



    const customer = await prisma.customer.upsert({
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

    const newAddress = await prisma.address.create({
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


    const newOrder = await prisma.order.create({
      data: {
        customerId: customer.id,
        subtotal: subtotal,
        total: total,
        shipping: total > SHIPPING ? SHIPPING : 0,
      }
    });

    
    const newOrderItems = items.map((item, i) => ({
      productId: item.productId,
      productName: products[i].title,
      originalPrice: products[i].originalPrice,
      price: products[i].price,
      color: item.color.map(color => ({
        colorId: color.colorId,
        colorName: color.name,
        quantity: color.quantity
      }))
    }));

    return resSuccess("Order created successfully");
  })
}