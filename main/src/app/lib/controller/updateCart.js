"use server";

import { resSuccess } from "@/app/hooks/resObj";
import { serializePrisma } from "@/app/hooks/serializePrisma";
import { TryCatch } from "@/app/hooks/TryCatch";

const updateCartController = async (items) => {
  console.log("updateCartController - items", items);
  
  return await TryCatch( async () => {
    if( !Array.isArray(items) || !items.length) return resSuccess([]);
    if(items.length > 15) return resSuccess([]);

    const products = await prisma.product.findMany({
      where: {
        id : {
          in: items.map(item => item)
        }
      }, 
      include: {
        images: {
          where: {
            displayOrder : 0
          },
          select: {
            url: true
          }
        }, 
        color: true,
        category: true,
        tags: true,
      }
    })



    return resSuccess(serializePrisma(products));
  })

}

export {updateCartController};