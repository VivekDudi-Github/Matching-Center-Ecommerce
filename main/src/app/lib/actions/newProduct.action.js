'use server';

import { prisma } from '@/app/lib/prisma';  
import {newProductFormSchema} from '@/app/lib/validation/product.schema';


export async function createNewProduct(data) {
  const parsedData = newProductFormSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData?.error  || "Something went wrong");
  }


  try {  
    const { title, slug, price, originalPrice, pattern,featured, isPublished, description, width, category, tags, colors, images, seoTitle, washCare, seoDescription } = parsedData.data;
  
    // create the product
    //get the signatures for uploiad images // upload to cloudinary
    //create the product images rows.

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        price,
        originalPrice,
        featured,
        isPublished: false,
        description,
        width,
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
                name: color.name,
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
        seoTitle,
        washCare,
        seoDescription,
      },
    });
    return product;
  } catch (error) {
    throw new Error(error);
  }

  return product;
}

export async function createNewProductImages(productId, images) {
  try {
    await prisma.productImages.createMany({
      data: images.map((image) => {
        return {
          productId,
          publicId: image.publicId,
          url: image.url,
          displayOrder: image.displayOrder,
        };
      }),
    });
      return images;
  } catch (error) {
    throw new Error(error);
  }
}