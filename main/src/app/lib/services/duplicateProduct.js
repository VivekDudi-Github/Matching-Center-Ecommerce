"use server";
import { prisma } from '@/app/lib/prisma';

export const duplicateproductService = async(id) => {
  if(!id) throw new Error("Product Id is missing");
  

    const product = await prisma.product.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        color: true,
        tags: true,
        category: true,
        images: true,
      }
    });
    if(!product) throw new Error("Product not found");

    const newProduct = await prisma.product.create({
      data: {
        title: product.title,
        slug: `${product.slug}-${product.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        sku:`${product.sku}-${Date.now().toString().slice(-4)}` ,
        price: product.price,
        originalPrice: product.originalPrice,
        featured: product.featured,
        isPublished: product.isPublished,
        description: product.description,
        width: product.width,
        pattern: product.pattern,
        category: product.category ? {
          connectOrCreate: {
            where: { name: product.category.name },
            create: { name: product.category.name },
          }
        } : undefined,
        
        tags: {
          connectOrCreate: (product.tags || []).map((tag) => ({
            where: { name: tag.name },
            create: { name: tag.name },
          })),
        },
        
        color: {
          create : (product.color || []).map((color) => ({
              name: color.name,
              hex: color.hex,
              availableMeters: color.availableMeters,
              lowStockAlert: color.lowStockAlert, 
            }
          ))
        },
        
        images: {
          create: (product.images || []).map((img) => ({
            publicId: img.publicId,
            url: img.url
          }))
        },
        seoTitle: product?.seoTitle,
        washCare: product?.washCare,
        seoDescription : product?.seoDescription,
      },
      include: {
        color: true,
        tags: true,
        category: true,
      }
    });
    console.log("DUPLICATE_PRODUCT:", newProduct);
}