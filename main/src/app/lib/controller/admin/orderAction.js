"use server";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { TryCatch } from "@/app/helpers/TryCatch";
import {prisma} from "@/app/lib/prisma";
import { requireAdmin } from "@/app/helpers/auth";
import { razorPayRefundService } from "../../services/server-actions/razorPayOrder";

export const initateRefundingProcess = async({id}) => {
  return await TryCatch( async() => {
    const order = await prisma.order.findFirst({
      where:{
        id
      },
      include: {
        payment: true
      }
    })

    if(order.payment.status !== "Paid"){
      return resError("The order is not paid for cancellation")
    }

    if(order.status !== "CancelRequested"){
      return resError("The order is not requested for cancellation")
    }

    const result = await razorPayRefundService(order);

    return result;
  }, requireAdmin)
}