"use server";

import { prisma } from '@/app/lib/prisma';
import { Prisma } from '@/generated/prisma/client';
import { hex } from 'zod';

export const createNewProductService = async(data) => {
  const { title, slug, price, originalPrice, pattern,featured, sku, isPublished, description, width, category, tags, colors, images, seoTitle, washCare, seoDescription } = data;

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
        create: colors.map((color) => {
          return {
            name: color.name,
            hex: color.hex,
            availableMeters: new Prisma.Decimal(color.availableMeters),
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
  return product;
}
