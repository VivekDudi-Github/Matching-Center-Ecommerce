"use server";

import { TryCatch } from "@/app/helpers/TryCatch";
import {  newOrderFormSchemaServer } from "@/app/lib/validation/newOrder.schema";
import {prisma} from "@/app/lib/prisma";
import { resError, resSuccess } from "@/app/helpers/resObj";
import z from "zod";
import { requireUser } from "@/app/helpers/auth";
import { createorderService, orderCancelService } from "@/app/lib/services/server-actions/createOrderService";

const SHIPPING = 80;

export const createorder = async(data) => {
  // data check //
  const parsedData = newOrderFormSchemaServer.safeParse(data);
    if (!parsedData.success) {
      const parseError = parsedData.error?.issues?.[0]?.message;
      return resError(parseError);
    }

  // main business logic //
  return await TryCatch(async (user) => {
    const email = user.email;
    const name = user.name;

    const result = await createorderService(parsedData.data, email, name, SHIPPING);
    console.log(result, "orderId")
    return result;
  }, requireUser)
}

export const cancelOrder = async(orderId) => {
  return await TryCatch(async (user) => {
    if(!orderId) return resError("No order ID was provided");

    const order = await prisma.order.findFirst({
      where : {
        id : orderId,
        customerId : user.id
      },
      include: {
        orderItems: true,
        payment: true
      }
    })

    if(!order) return resError("Order not found");

    const result = await orderCancelService(order, { user });

    return result;
  }, requireUser)
}