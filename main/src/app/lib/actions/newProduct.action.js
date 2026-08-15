'use server';

import { prisma } from '@/app/lib/prisma';
import {newProductFormSchema} from '@/app/lib/validation/product.schema';


export async function createNewProduct(data) {
  const parsedData = newProductFormSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData?.error  || "Something went wrong");
  }
  try {  
    const { title, slug, price, originalPrice, pattern,featured, sku, isPublished, description, width, category, tags, colors, images, seoTitle, washCare, seoDescription } = parsedData.data;
    const dbUrl = new URL(process.env.DATABASE_URL_NON_POOLED);

    console.log("DB HOST:", dbUrl.hostname);
    console.log("DB PORT:", dbUrl.port);
    console.log("DB DATABASE:", dbUrl.pathname);
    
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
      ,
    };
  } catch (error) {   
    console.error("PRISMA ERROR:", error);
    console.error("CODE:", error?.code);
    console.error("META:", error?.meta);
    console.error("MESSAGE:", error?.message);
    throw new Error(error);
  }
}

export async function createNewProductImages(productId, image) {
  try {
    await prisma.productImages.create({
      data: {
        publicId: image.uploadData.publicId,
        url: image.uploadData.url,
        displayOrder: image.displayOrder,
        productId,
      }   
    });
      return image;
  } catch (error) {
    throw new Error(error);
  }
}