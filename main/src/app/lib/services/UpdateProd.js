"use server";


import { prisma } from '@/app/lib/prisma';


export const updateProductService = async(id, data) => {
  const { title, slug, price, originalPrice, pattern,featured, sku, isPublished, description, width, category, tags, colors, images, seoTitle, washCare, seoDescription } = data;
  
  let product = null;
  await prisma.$transaction(async (tx) => {
    const dbTags = await Promise.all(
      tags.map((tag) => {
        return tx.tag.upsert({
          where: {
            name: tag,
          },
          create: {
            name: tag,
          },
          update: {},
        });
      })
    );

    product = await tx.product.update({
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
          set: dbTags.map((tag) => ({ id: tag.id })),
        },
        color :{
          deleteMany: {} , 
          create: colors.map((color) => {
            return {
              name: color.name,
              hex: color.hex,
              availableMeters: color.availableMeters,
              lowStockAlert: color.lowStockAlert, 
              isLowStock: color.availableMeters <= color.lowStockAlert,
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
  
  }, {timeout: 20000});

  return product;
}