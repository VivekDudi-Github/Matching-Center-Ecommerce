"use server";

import {prisma} from "@/app/lib/prisma";
import {TryCatch} from "@/app/hooks/TryCatch";
import { fetchOrdersByCustomerIdService } from "../services/fetchOrderService";
import { resError, resSuccess } from "@/app/hooks/resObj";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const fetchOrderById = async (id) => {
  if (!id) return resError("Order Id is missing");

  return await TryCatch(async () => {
    const order = await prisma.order.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        customer: true,
        items: true,
      },
    });
    return resSuccess(serializePrisma(order));
  });
};

export const fetchUserOrders = async (cursor) => {
  let session = null;
  try {
    session = await getServerSession(authOptions);
    if(!session || !session?.user) return resError("Please login to place order");
  } catch (error) {
    return resError("Something went wrong, please relogin and try again");
  }

  return await TryCatch(async () => {
    const email = session?.user?.email;
    return resSuccess(await fetchOrdersByCustomerIdService({email, cursor}));
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