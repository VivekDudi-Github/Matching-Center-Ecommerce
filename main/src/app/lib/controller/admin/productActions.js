'use server';

import { serializePrisma } from '@/app/helpers/serializePrisma';
import { TryCatch } from '@/app/helpers/TryCatch';
import { prisma } from '@/app/lib/prisma';
import {newProductFormSchema} from '@/app/lib/validation/product.schema';
import { updateProductService } from '@/app/lib/services/server-actions/UpdateProd';
import { duplicateproductService } from '@/app/lib/services/server-actions/duplicateProduct';
import { deleteProductImagesService } from '@/app/lib/services/server-actions/deleteImages';
import { resError, resSuccess } from '@/app/helpers/resObj';
import { createNewProductService } from '@/app/lib/services/server-actions/createNewProd';
import { requireAdmin } from '@/app/helpers/auth';


export async function createNewProduct(data) {
  const parsedData = newProductFormSchema.safeParse(data);
  if (!parsedData.success) {
    return resError(parsedData?.error  || "Something went wrong");
  }
  return await TryCatch( async () => {
    const result = await createNewProductService(parsedData.data);
    return resSuccess(serializePrisma(result.data));
  });
}

export async function createNewProductImages(productId, image) {
  if(!productId) return resError("Product Id is missing");
  return await TryCatch( async () => {
    await prisma.productImages.create({
      data: {
        publicId: image.uploadData.publicId,
        url: image.uploadData.url,
        displayOrder: image.displayOrder,
        productId,

      }   
    });
    return resSuccess(image);
  });
}

export async function deleteProductImages({ id} ) {
  if(!id) return resError("Image id is missing");

  return await TryCatch( async () => {
    const result = await deleteProductImagesService({id});
    return result;
  });
}

export const updateProduct = async(id, data) => {
  return await TryCatch( async () => {
    if(!id) return resError("Product Id is missing");
    const parsedData = newProductFormSchema.safeParse(data);
    if (!parsedData.success) {
      return resError(parsedData?.error  || "Something went wrong");
    }
    const result = await updateProductService(id, parsedData.data);

    return resSuccess(serializePrisma(result.data));

  }, "updateProduct", requireAdmin);
}

export const deleteProductAction = async(id) => {
  if(!id) return resError("Product Id is missing");
  return await TryCatch( async () => {
    const product = await prisma.product.update({
      where: {
        id: id
      }, 
      data: {
        deletedAt: new Date()
      }
    });
    return resSuccess(true);
  }, "deleteProductAction", requireAdmin);
}

export const revertDeleteProductAction = async(id) => {
  if(!id) return resError("Product Id is missing");
  return await TryCatch( async () => {
    const product = await prisma.product.update({
      where: {
        id: id
      }, 
      data: {
        deletedAt: null
      }
    });
    return resSuccess(true);
  }, requireAdmin);
}

export const duplicateProductAction = async(id) => {
  if(!id) return resError("Product Id is missing");
  return await TryCatch( async () => {
    const result = await duplicateproductService(id);

    return resSuccess(serializePrisma(result.data));
  }, requireAdmin);
};
