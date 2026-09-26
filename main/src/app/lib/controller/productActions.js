'use server';

import { serializePrisma } from '@/app/hooks/serializePrisma';
import { TryCatch } from '@/app/hooks/TryCatch';
import { prisma } from '@/app/lib/prisma';
import {newProductFormSchema} from '@/app/lib/validation/product.schema';
import { updateProductService } from '../services/UpdateProd';
import { duplicateproductService } from '../services/duplicateProduct';
import { deleteProductImagesService } from '../services/deleteImages';
import { resError, resSuccess } from '@/app/hooks/resObj';
import { createNewProductService } from '../services/createNewProd';


export async function createNewProduct(data) {
  const parsedData = newProductFormSchema.safeParse(data);
  if (!parsedData.success) {
    return resError(parsedData?.error  || "Something went wrong");
  }
  return await TryCatch( async () => {
    const product = await createNewProductService(parsedData.data);
    return resSuccess(serializePrisma(product));
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
    await deleteProductImagesService({id});
    return resSuccess(true);
  });
}

export const updateProduct = async(id, data) => {
  return await TryCatch( async () => {
    if(!id) throw new Error("Product Id is missing");
    const parsedData = newProductFormSchema.safeParse(data);
    if (!parsedData.success) {
      throw new Error(parsedData?.error  || "Something went wrong");
    }
    let product = await updateProductService(id, parsedData.data);  
  
    return resSuccess(serializePrisma(product)); 
  
  });
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
  });
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
  });
}

export const duplicateProductAction = async(id) => {
  if(!id) return resError("Product Id is missing");
  return await TryCatch( async () => {
    const newProduct = await duplicateproductService(id);

    return resSuccess(serializePrisma(newProduct));
  });
};
