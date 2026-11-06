"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TryCatch } from "@/app/helpers/TryCatch";
import { getServerSession } from "next-auth";
import {prisma} from "@/app/lib/prisma";
import { serializePrisma } from "@/app/helpers/serializePrisma";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { Status as StatusRef} from "@/generated/prisma/enums";
import z from "zod";

const LIMIT = 11;


export const getAdminOrders = async ({status, search, cursor}) => {
  return TryCatch( async () => {
      const session = await getServerSession(authOptions); 

      // if(!session || !session.user.email !== "") return resError("Unauthorized request");
      console.log("Status", status);
      if (status !== "All" && !Object.values(StatusRef).includes(status)) {
        return resError("Invalid status filter provided"); 
      }

      const cursorFilter = cursor ? {
        cursor : {
          id : cursor
        }
      } : {} ;
      

      const statusFilter = status !== "All" ? { status } : {};
      const v7Schema = z.uuidv7();

      let isId = v7Schema.safeParse(search);
      console.log("isId:", isId , search);
      isId = !!isId.success ;  

      const searchFIlter = isId ? {
        id : search
      } : search ? {
        customer : {
          name : {
            contains : search,
            mode: "insensitive"
          }
        }
      } : {} ;

      const orders = await prisma.order.findMany({
        where: {
          payment: {
            status : "Paid"
          },
          ...statusFilter ,
          ...searchFIlter
        },
        orderBy: {
          id: "desc"
        },
        ...cursorFilter,
        skip: cursor ? 1: 0,
        take: !cursor ? 6 : LIMIT ,
        include: {
          customer: true,
          payment: true,
        }
      })

      let newCursor = null;
      if(orders.length === 6) {
        newCursor = orders.at(-2).id;
        orders.pop();
      }

      return resSuccess({list : serializePrisma(orders) , newCursor : serializePrisma(newCursor)});

  })
}