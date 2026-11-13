"use server";

import { TryCatch } from "@/app/helpers/TryCatch";
import {prisma} from "@/app/lib/prisma";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { Status as StatusRef} from "@/generated/prisma/enums";



export const changeAdminOrderStatus = async({status, id}) => {
  return await TryCatch( async() => {

      if (!Object.values(StatusRef).includes(status)) {
        return resError("Invalid status provided"); 
      };

      if(!id) return resError("id is required");

      await prisma.order.update({
        where: {
          id
        },
        data: {
          status: status
        }
      })
      return resSuccess(status);
  })
}