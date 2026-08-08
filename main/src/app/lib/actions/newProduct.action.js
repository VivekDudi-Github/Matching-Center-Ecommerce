'use server';

import { prisma } from '@/app/lib/prisma';  
import {newProductFormSchema} from '@/app/lib/validation/product.schema';


export async function createNewProduct(data) {
  const parsedData = newProductFormSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error('Invalid data');
  }


  try {  
    const { title, slug, price, originalPrice, featured, isPublished, description, width, category, tags, colors, images, seoTitle, washCare, seoDescription } = parsedData.data;
  
    const product = await prisma.product.create({
      data: {
        title,
        slug,
        price,
        originalPrice,
        featured,
        isPublished,
        description,
        width,
        category,
        tags,
        colors,
        images,
        seoTitle,
        washCare,
        seoDescription,
      },
    });
  } catch (error) {
    
  }

  return product;
}