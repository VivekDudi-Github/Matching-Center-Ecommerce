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
          create: colors.map((color) => {
            return {
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

export async function deleteProductImages({ id} ) {
  if(!id) throw new Error("Image id is missing");

  return await TryCatch( async () => {
    let filter = {};

    if(id) filter.id = id;
 
    const deletedRow = await prisma.productImages.delete({
      where: {
        ...filter
      }
    });

    const isExist = await prisma.productImages.findFirst({
      where: {
        publicId: deletedRow.publicId
      },
      select: { id: true }
    })
    console.log("isExist: ", isExist);
    
    if(!isExist) {
      await prisma.strandedImages.create({
        data: {
          publicId: deletedRow.publicId,
          url: deletedRow.url,
        }
      })  
    }

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

export const deleteProductAction = async(id) => {
  if(!id) throw new Error("Product Id is missing");
  return await TryCatch( async () => {
    const product = await prisma.product.update({
      where: {
        id: Number(id)
      }, 
      data: {
        deletedAt: new Date()
      }
    });
    return true;
  });
}

export const revertDeleteProductAction = async(id) => {
  if(!id) throw new Error("Product Id is missing");
  return await TryCatch( async () => {
    const product = await prisma.product.update({
      where: {
        id: Number(id)
      }, 
      data: {
        deletedAt: null
      }
    });
    return true;
  });
}

export const duplicateProductAction = async(id) => {
  if(!id) throw new Error("Product Id is missing");
  return await TryCatch( async () => {
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

    

    return {
      ...newProduct, 
      originalPrice: newProduct.originalPrice.toNumber(),
      price: newProduct.price.toNumber(),
      color: 
        newProduct?.color?.map((color) => ({
          name: color.name,
          hex: color.hex,
          availableMeters: color.availableMeters.toNumber(),
          lowStockAlert: color.lowStockAlert.toNumber(),
        }))
      }
  });
};
