import "server-only";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TryCatch } from "@/app/helpers/TryCatch";
import { getServerSession } from "next-auth";
import {prisma} from "@/app/lib/prisma";
import { serializePrisma } from "@/app/helpers/serializePrisma";
import { resSuccess } from "@/app/helpers/resObj";


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