'use server';

import { TryCatch } from '@/app/hooks/TryCatch';
import { prisma } from '@/app/lib/prisma';
import {newProductFormSchema} from '@/app/lib/validation/product.schema';


export async function createNewProduct(data) {
  const parsedData = newProductFormSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData?.error  || "Something went wrong");
  }
  return await TryCatch( async () => {
    const { title, slug, price, originalPrice, pattern,featured, sku, isPublished, description, width, category, tags, colors, images, seoTitle, washCare, seoDescription } = parsedData.data;
  
    const product = await prisma.product.create({
      data: {
        title,
        slug,
        price,
        originalPrice,
        featured,
        isPublished,
        description,
        width ,
        sku,
        pattern,
        category: {
          connectOrCreate: {
            where: {
              name: category,
            },
            create: {
              name: category,
            },
          }
        },
        tags: {
          connectOrCreate: tags.map((tag) => {
            return {
              where: {
                name: tag,
              },
              create: {
                name: tag,
              },
            };
          }),
        },
        color :{
          connectOrCreate: colors.map((color) => {
            return {
              where: {
                hex: color.hex,
              },
              create: {
                name: color.name,
                hex: color.hex,
                availableMeters: color.availableMeters,
                lowStockAlert: color.lowStockAlert, 
              },
            };
          })
        } ,
        seoTitle: seoTitle ?? title,
        washCare,
        seoDescription : seoDescription ?? description,
      },
      include: {
        color: true,
        tags: true,
        category: true,
      }
    });
    console.log("PRODUCT:", {
      ...product, 
      originalPrice: product.originalPrice.toNumber(),
      price: product.price.toNumber(),
      color: product?.color?.map((color) => ({
          name: color.name,
          hex: color.hex,
          availableMeters: color.availableMeters.toNumber(),
          lowStockAlert: color.lowStockAlert.toNumber(),
        }))
      ,
    });
    return {
      ...product, 
      originalPrice: product.originalPrice.toNumber(),
      price: product.price.toNumber(),
      color: 
        product?.color?.map((color) => ({
          name: color.name,
          hex: color.hex,
          availableMeters: color.availableMeters.toNumber(),
          lowStockAlert: color.lowStockAlert.toNumber(),
        }))
      }}
    );
  
}

export async function createNewProductImages(productId, image) {
  if(!productId) throw new Error("Product Id is missing");
  return await TryCatch( async () => {
    await prisma.productImages.create({
      data: {
        publicId: image.uploadData.publicId,
        url: image.uploadData.url,
        displayOrder: image.displayOrder,
        productId,

      }   
    });
      return image;
  });
}

export async function deleteProductImages(publicId) {
  if(!publicId) throw new Error("Image publicId is missing");

  return await TryCatch( async () => {
    await prisma.productImages.deleteMany({
      where: {
        publicId: publicId,
      }
    });

    return true;
  });

}

export const updateProduct = async(id, data) => {
  return await TryCatch( async () => {
    if(!id) throw new Error("Product Id is missing");
    const parsedData = newProductFormSchema.safeParse(data);
    if (!parsedData.success) {
      throw new Error(parsedData?.error  || "Something went wrong");
    }

    const { title, slug, price, originalPrice, pattern,featured, sku, isPublished, description, width, category, tags, colors, images, seoTitle, washCare, seoDescription } = parsedData.data;
    const product = await prisma.product.update({
      where: {
        id: Number(id)
      },
      data: {
        title,
        slug,
        price,
        originalPrice,
        featured,
        isPublished,
        description,
        width ,
        sku,
        pattern,
        category: {
          connectOrCreate: {
            where: {
              name: category,
            },
            create: {
              name: category,
            },
          }
        },
        tags: {
          connectOrCreate: tags.map((tag) => {
            return {
              where: {
                name: tag,
              },
              create: {
                name: tag,
              },
            };
          }),
        },
        color :{
          connectOrCreate: colors.map((color) => {
            return {
              where: {
                hex: color.hex,
              },
              create: {
                name: color.name,
                hex: color.hex,
                availableMeters: color.availableMeters,
                lowStockAlert: color.lowStockAlert, 
              },
            };
          })
        } ,
        seoTitle: seoTitle ?? title,
        washCare,
        seoDescription : seoDescription ?? description,
      },
      include: {
        color: true,
        tags: true,
        category: true,
      }
    });
    return {
    ...product, 
    originalPrice: product.originalPrice.toNumber(),
    price: product.price.toNumber(),
    color: 
      product?.color?.map((color) => ({
        name: color.name,
        hex: color.hex,
        availableMeters: color.availableMeters.toNumber(),
        lowStockAlert: color.lowStockAlert.toNumber(),
      }))
    }
  });
}