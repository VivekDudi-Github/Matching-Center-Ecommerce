"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TryCatch } from "@/app/helpers/TryCatch";
import { getServerSession } from "next-auth";
import {prisma} from "@/app/lib/prisma";
import { serializePrisma } from "@/app/helpers/serializePrisma";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { Status as StatusRef} from "@/generated/prisma/enums";
import { adminOrderService } from "../services/Ably/adminOrdersService";


export const getAdminOrders = async ({status, search, cursor}) => {
  return TryCatch( async () => {
      const session = await getServerSession(authOptions); 

      // if(!session || !session.user.email !== "") return resError("Unauthorized request");

      if (status !== "All" && !Object.values(StatusRef).includes(status)) {
        return resError("Invalid status filter provided"); 
      }
      const {orders, newCursor} = await adminOrderService({cursor, search, status});

      return resSuccess({list : serializePrisma(orders) , newCursor : serializePrisma(newCursor)});

  })
}

export const getAdminOrderById = async(id) => {
  return TryCatch( async () => {
    const session = await getServerSession(authOptions); 

    // if(!session || !session.user.email !== "") return resError("Unauthorized request");
  
    const order = await prisma.order.findFirst({
      where: {
        id : id
      },
      include: {
        customer: true,
        payment: true,
        address: true,
        orderItems: {
          include: {
            image: {
              select : {
                url: true
              }
            }
          }
        }
        
      }
    })

    return resSuccess(serializePrisma(order));
  })
}