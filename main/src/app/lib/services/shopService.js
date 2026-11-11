import "server-only";
import { resSuccess } from '@/app/helpers/resObj';
import { serializePrisma } from '@/app/helpers/serializePrisma';
import { prisma } from '@/app/lib/prisma';

export const getShopSelectionService = async() => {
  const selections = await prisma.category.findMany({
          select:{
              id: true,
              name: true,
              _count:{
                  select:{
                      products: {
                        where: {
                            deletedAt : null
                        }
                      }
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
    console.log(categoryId,outOfStock, minPrice, maxPrice, sort, searchText, cursor )

    const products = await prisma.product.findMany({
        where:{
            isPublished: true,
            deletedAt: null,
            ...(categoryId?.length && { 
                categoryId: {
                    in : categoryId
            } }),
            price: { 
                ...(maxPrice && {lte : maxPrice} ),
                ...(minPrice && {gte: minPrice} ), 
            },
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
            ...(sort === "newest" && {id: "desc"}) ,
        },
        include: {
            color: true,
            tags: true,
            category: true,
            images: {
                where: {
                    displayOrder: 0
                }
            },
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