"use server";

import { resSuccess } from '@/app/hooks/resObj';
import { serializePrisma } from '@/app/hooks/serializePrisma';
import { prisma } from '@/app/lib/prisma';

export const getShopSelectionService = async() => {
  const selections = await prisma.category.findMany({
          select:{
              id: true,
              name: true,
              _count:{
                  select:{
                      products: true
                  }
              }     
          }
  });

  const highPrices = await prisma.product.findMany({
      where:{
          deletedAt: null
      },
      take: 1,
      orderBy:{
          price: 'desc'
      } ,
  })
  const lowhPrices = await prisma.product.findMany({
      where:{
          deletedAt: null,
      },
      take: 1,
      orderBy:{
          price: 'asc'
      } ,
  })
  const priceRange = {
      low : lowhPrices[0]?.price,
      high : highPrices[0]?.price
  }
  return {selections, priceRange}
}


export const getShopProductsService = async({categoryId, outOfStock, minPrice, maxPrice, sort, searchText, cursor}) => {
    if(typeof categoryId === "string" && categoryId.length > 0) {
        categoryId = categoryId?.split(",")?.map(id => parseInt(id));
    } else {
        categoryId = [];
    }

    const products = await prisma.product.findMany({
        where:{
            isPublished: true,
            deletedAt: null,
            ...(categoryId.length && { 
                categoryId: {
                    in : categoryId
            } }),
            ...(minPrice && { price: { gte: Math.max(minPrice,0) } }),
            ...(maxPrice && { price: { lte: maxPrice } }),
            ...(searchText && { 
                OR: [
                    {
                        title: {
                            contains: searchText,
                            mode: "insensitive",
                        },
                    },
                    {
                        tags: {
                            some: {
                                name: {
                                    contains: searchText,
                                    mode: "insensitive",
                                },
                            },
                        },
                    }, 
                ],
            }),
            ...(!outOfStock && {
                color: {
                    some:{
                        availableMeters :{
                            gt : 0
                        }
                    }
                }
            })
        },
        orderBy:{
            ...(sort === "price-asc" && {price: "asc"}) ,
            ...(sort === "price-desc" && {price: "desc"}) ,
            ...(sort === "featured" && {id: "desc"}) ,
        },
        include: {
            color: true,
            tags: true,
            category: true,
            images: true,
        },
        take: 11,
        ...(cursor && {skip: 1}),
        ...(cursor && { 
            cursor : {
                id : cursor
            } 
        }),
    });

    let newCursor = null;
    if(products.length > 10) {
        newCursor = products.length > 10 ? products[9].id : null;
        products.pop();
    }
    return {products : serializePrisma(products), newCursor};
}