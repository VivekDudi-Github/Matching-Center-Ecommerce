import "server-only";
import { TryCatch } from "@/app/helpers/TryCatch";
import {prisma} from "@/app/lib/prisma";
import { serializePrisma } from "@/app/helpers/serializePrisma";
import { resSuccess } from "@/app/helpers/resObj";
import { requireAdmin } from "@/app/helpers/auth";


export const getAdminOrderById = async(id) => {
  return TryCatch( async () => {
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
  }, requireAdmin)
}