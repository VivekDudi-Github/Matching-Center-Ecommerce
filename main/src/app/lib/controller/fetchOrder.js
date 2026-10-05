"use server";

import {prisma} from "@/app/lib/prisma";
import {TryCatch} from "@/app/hooks/TryCatch";
import { fetchOrdersByCustomerIdService } from "../services/fetchOrderService";
import { resError, resSuccess } from "@/app/hooks/resObj";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { serializePrisma } from "@/app/hooks/serializePrisma";

export const fetchOrderById = async (id) => {
  if (!id) return resError("Order Id is missing");

  return await TryCatch(async () => {
    const session = await getServerSession(authOptions);
    if(!session || !session?.user) return resError("Please login to place order");

    const userId = session?.user?.id; 
    if(!userId) return resError("Something went wrong please logIn again.");

    const order = await prisma.order.findUnique({
      where: {
        id: id,
        customerId: userId
      },
      include: {
        customer: true,
        orderItems: {
          include:{
            image: {
              select: {
                url: true
              }
            }
          }
        },
        payment: true,
        address: true,
      },
    });
    if(!order) return resError("Order not found");

    return resSuccess(serializePrisma(order));
  });
};

export const fetchUserOrders = async (cursor) => {
  return await TryCatch(async () => {
    const session = await getServerSession(authOptions);
    if(!session || !session?.user) return resError("Please login to place order");

    const userId = session?.user?.id;
    if(!userId) return resError("User credential is missing");

    console.log("userId", userId);

    return resSuccess(await fetchOrdersByCustomerIdService({customerId: userId, cursor}));
  });
}

export const fetchOrdersByCustomerId = async (customerId, cursor) => {
  if (!customerId) return resError("Customer Id is missing");
  return await TryCatch(async () => {
    return resSuccess(
      await fetchOrdersByCustomerIdService({customerId, cursor})
    );
  });
}