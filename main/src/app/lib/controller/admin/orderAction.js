"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { TryCatch } from "@/app/helpers/TryCatch";
import {prisma} from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { razorPayRefundService } from "../../services/razorPayOrder";

export const initateRefundingProcess = async({id}) => {
  return await TryCatch( async() => {
    const session = await getServerSession(authOptions);

    // if(session.user.email !== "Admin"){
    //   return resError("Unathorized request");
    // }

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

    await razorPayRefundService(order);


    return resSuccess("Refund Started");
  })
}