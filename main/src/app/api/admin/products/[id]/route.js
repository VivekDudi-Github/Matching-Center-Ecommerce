

import { serializePrisma } from "@/app/helpers/serializePrisma";
import { ApiTryCatch, TryCatch } from "@/app/helpers/TryCatch";
import { resError, resSuccess } from "@/app/helpers/resObj";


export default async function GET(req, context){
// ?export const getAdminProdById = async(id) => {
 
  return await ApiTryCatch(async () => {

    const { id } = await context.params;
    if(!id) return  resError("Product Id is missing", null, 400, true);

    const product = await prisma.product.findUnique({
      where: {
        id: id
      },
      include: {
        color: true,
        tags: true,
        category: true,
        images: true,
      },
    });
    return resSuccess(serializePrisma(product), 200, true);
  }, "getAdminProdById");
} 
