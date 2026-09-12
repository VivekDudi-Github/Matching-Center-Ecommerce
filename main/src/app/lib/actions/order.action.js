"use server";

import { TryCatch } from "@/app/hooks/TryCatch";
import { newOrderFormSchema } from "../validation/newOrder.schema";

export const createorder = async(data) => {
  const parsedData = newOrderFormSchema.safeParse(data);
    if (!parsedData.success) {
      throw new Error(parsedData?.error  || "Something went wrong");
    }

  return await TryCatch(() => {
    const {name ,phone,email,address,area,locality,landmark,city,state,pincode,payment,notes} = data;
    // create an order with the avai

  })
}