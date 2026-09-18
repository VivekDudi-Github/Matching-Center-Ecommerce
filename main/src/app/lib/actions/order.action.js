"use server";

import { TryCatch } from "@/app/hooks/TryCatch";
import {  newOrderFormSchemaServer } from "../validation/newOrder.schema";
import {prisma} from "@/app/lib/prisma";
import { resError, resSuccess } from "@/app/hooks/resObj";
import z from "zod";
import { p } from "framer-motion/client";

export const createorder = async(data) => {
  const parsedData = newOrderFormSchemaServer.safeParse(data);
    if (!parsedData.success) {
      const {errors, properties} = z.treeifyError(parsedData.error);
      
      if(errors.length) {
        console.log("parseError", parseError);
        return resError("Something went wrong, please try again");
      }
      let parseError = [];
      Object.keys(properties).forEach(key => {
        if(properties[key]?.errors?.length) {
          parseError.push(properties[key].errors[0]);
        }
      });
      return resError (parseError);
    }

  return await TryCatch(async () => {
    const {name ,phone,email,address,area,landmark,city,state,pincode,payment,notes, items} = data;
    
    const colors = items.map(item => item.color).flat();
    const fetchedVariants = await prisma.productVariant.findMany({
      where: {
        OR: colors.map((color) => ({
          id: color.colorId,
          availableMeters: {
            gte: color.quantity
          }}
        ))
      }
    });
    console.log("fetchedVariants", fetchedVariants);
    
    const errorMessages = [];
    for (let color of colors) {
      const isMatch = fetchedVariants.find(variant => variant.id === color.colorId);

      if(!isMatch) {
        errorMessages.push(`Stock not available for ${color.colorName}, selected ${color.quantity}  `);
      }
    }

    if(errorMessages.length > 0) {
      return resError(errorMessages.join("\n"));
    }

    return resSuccess("Order created successfully");
 

  })
}