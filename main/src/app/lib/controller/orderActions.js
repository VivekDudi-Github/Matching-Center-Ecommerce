"use server";

import { TryCatch } from "@/app/hooks/TryCatch";
import {  newOrderFormSchemaServer } from "../validation/newOrder.schema";
import {prisma} from "@/app/lib/prisma";
import { resError, resSuccess } from "@/app/hooks/resObj";
import z from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createorderService } from "../services/createOrderService";

const SHIPPING = 80;

export const createorder = async(data) => {
  // sign in check //
  let session = null;
  try {
      session = await getServerSession(authOptions);
      if(!session || !session?.user) return resError("Please login to place order");
  } catch (error) {
      console.log("error in getServerSession", error);
      return resError("Something went wrong, please relogin and try again");
  }
  
  // data check //
  console.log("data");
  const parsedData = newOrderFormSchemaServer.safeParse(data);
    if (!parsedData.success) {
      const {errors, properties} = z.treeifyError(parsedData.error);
      console.log(errors)      
      let parseError = [];
      if(errors.length) {
        return resError("Something went wrong, please try again");
      }
      Object.keys(properties).forEach(key => {
        if(properties[key]?.errors?.length) {
          parseError.push(properties[key].errors[0]);
        }
      });
      return resError(parseError);
    }

  // main business logic //
  return await TryCatch(async () => {    
    const email = session.user.email;
    const name = session.user.name;

    const orderId = await createorderService(parsedData.data, email, name, SHIPPING);
    console.log(orderId, "orderId")
    return resSuccess({orderId: orderId});
  })
}