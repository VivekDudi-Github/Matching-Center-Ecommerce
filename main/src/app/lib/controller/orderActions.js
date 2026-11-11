"use server";

import { TryCatch } from "@/app/helpers/TryCatch";
import {  newOrderFormSchemaServer } from "@/app/lib/validation/newOrder.schema";
import {prisma} from "@/app/lib/prisma";
import { resError, resSuccess } from "@/app/helpers/resObj";
import z from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createorderService, orderCancelService } from "@/app/lib/services/createOrderService";

const SHIPPING = 80;

export const createorder = async(data) => {
  // sign in check //
  let session = null;
  try {
      session = await getServerSession(authOptions);
      if(!session || !session?.user) return resError("Please login to place order");
  } catch (error) {
      console.log("error in getServerSession", error);
      return resError("Something went wrong, please relogin and try again");
  }
  
  // data check //
  const parsedData = newOrderFormSchemaServer.safeParse(data);
    if (!parsedData.success) {
      const parseError = parsedData.error?.issues?.[0]?.message;
      return resError(parseError);
    }

  // main business logic //
  return await TryCatch(async () => {    
    const email = session.user.email;
    const name = session.user.name;

    const orderId = await createorderService(parsedData.data, email, name, SHIPPING);
    console.log(orderId, "orderId")
    return resSuccess({orderId: orderId});
  })
}

export const cancelOrder = async(orderId) => {
  return await TryCatch(async () => {
    if(!orderId) return resError("No order ID was provided");
    
    const session = await getServerSession(authOptions);
    if(!session || !session?.user) return resError("Please login to place order");

    const order = await prisma.order.findFirst({
      where : {
        id : orderId,
        customerId : session.user.id
      },
      include: {
        orderItems: true,
        payment: true
      }
    })

    if(!order) return resError("Order not found");

    const updatedOrder = await orderCancelService(order,session);

    return resSuccess("Order cancel initated.")
  })
}