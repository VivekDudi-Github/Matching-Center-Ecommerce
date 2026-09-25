'use server';

import { serializePrisma } from "@/app/hooks/serializePrisma";
import { TryCatch } from "@/app/hooks/TryCatch";



export const getFirstAdminProdListNotStatusBased = async( search, category) => {
  return await TryCatch( async () => {
    const where = {
    ...(search
      ? {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              tags: {
                some: {
                  name: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
        }
      : {}),

    ...(category && category !== "All Categories"
      ? {
          category: {
            name: {
              equals: category,
              mode: "insensitive",
            },
          },
        }
      : {}),
    };

    const products = await prisma.product.findMany({
      where: {
        ...where,
        deletedAt: null,
      },
      orderBy: {
        id : "desc"
      }, 
      include: {
        color: true,
        tags: true,
        category: true,
        images: true,
      },
      take: 11
    });


    const hasMoreLength = products.length > 10;
    if(hasMoreLength) {
      products.pop();
    }
    console.log("LIST:", products?.length);
    return {list : serializePrisma(products) , newCursor: hasMoreLength ? products[products.length - 1].id : null};
  
  })
};

export const getFirstAdminProdListStatusBased = async( search, category, status) => {
  return await TryCatch( async () => {
    
    const statusWhere = {} ;
    if(status === "active") {
      statusWhere.isLowStock = false;
      statusWhere.availableMeters = {
        gt: 0,
      };
    }; 
    if(status === "out-of-stock") statusWhere.availableMeters = 0;
    if(status === "low-stock") {
      statusWhere.isLowStock = true,
      statusWhere.availableMeters = {
        gt : 0
      };
    };

    
    const variants = await prisma.productVariant.findMany({
      where: {
        ...statusWhere,
        
        product: {
          ...(search
            ? {
                OR: [
                  {
                    title: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    tags: {
                      some: {
                        name: {
                          contains: search,
                          mode: "insensitive",
                        },
                      },
                    },
                  },
                ],
              }
            : {}),

          ...(category && category !== "All Categories"
            ? {
                category: {
                  name: {
                    equals: category,
                    mode: "insensitive",
                  },
                },
              }
            : {}),
        },
      },
      
      orderBy: {
        id: "desc",
      },
      take: 11,
      include: {
        product: {
          include: {
            tags: true,
            category: true,
            images: true,
          },
        },
      },

    });

    
    const newCursor = variants.length > 10 ? variants[9].id : null;
    if(newCursor) variants.pop();


    const products = Object.values(
      variants.reduce((acc, variant) => {
        const productId = variant.product.id;

        if (!acc[productId]) {
          acc[productId] = {
            ...variant.product,
            color: [],
          };
        }

        acc[productId].color.push({
          id: variant.id,
          name: variant.name,
          hex: variant.hex,
          availableMeters: variant.availableMeters,
          lowStockAlert: variant.lowStockAlert,
          isLowStock: variant.isLowStock,
        });

        return acc;
      }, {})
    );

    return {list : serializePrisma(products), newCursor}; 

  });
};

export const getMoreAdminProdListNotStatusBased = async(cursor, search, category) => {
  return await TryCatch( async () => {
    const where = {
      ...(search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                tags: {
                  some: {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
              },
            ],
          }
        : {}),

      ...(category && category !== "All Categories"
        ? {
            category: {
              name: {
                equals: category,
                mode: "insensitive",
              },
            },
          }
        : {}),
    };


    const products = await prisma.product.findMany({
      where: {
        ...where
      },
      orderBy: {
        id : "desc"
      },
      cursor: {
        id: cursor
      }, 
      skip: 1,
      include: {
        color: true,
        tags: true,
        category: true,
        images: true,
      },
      take: 11
    });

    const newCursor = products.length > 10 ? products[9].id : null;
    if(newCursor) products.pop();

    return {list : serializePrisma(products), newCursor};
  });
};

export const getMoreAdminProdListStatusBased = async(cursor, search, category, status) => {
  return await TryCatch( async () => {
    
    const statusWhere = {} ;
    if(status === "active") {
      statusWhere.isLowStock = false;
      statusWhere.availableMeters = {
        gt: 0,
      };
    }; 
    if(status === "out-of-stock") statusWhere.availableMeters = 0;
    if(status === "low-stock") {
      statusWhere.isLowStock = true,
      statusWhere.availableMeters = {
        gt : 0
      };
    };

    const variants = await prisma.productVariant.findMany({
      where: {
        ...statusWhere,
        
        product: {
          ...(search
            ? {
                OR: [
                  {
                    title: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    tags: {
                      some: {
                        name: {
                          contains: search,
                          mode: "insensitive",
                        },
                      },
                    },
                  },
                ],
              }
            : {}),

          ...(category && category !== "All Categories"
            ? {
                category: {
                  name: {
                    equals: category,
                    mode: "insensitive",
                  },
                },
              }
            : {}),
        },
      },
      
      orderBy: {
        id: "desc",
      },
      cursor: {
        id: cursor,
      },
      take: 11,
      skip: 1,
      
      include: {
        product: {
          include: {
            tags: true,
            category: true,
            images: true,
          },
        },
      },

    });

    
    const newCursor = variants.length > 10 ? variants[9].id : null;
    if(newCursor) variants.pop();


    const products = Object.values(
      variants.reduce((acc, variant) => {
        const productId = variant.product.id;

        if (!acc[productId]) {
          acc[productId] = {
            ...variant.product,
            color: [],
          };
        }

        acc[productId].color.push({
          id: variant.id,
          name: variant.name,
          hex: variant.hex,
          availableMeters: variant.availableMeters,
          lowStockAlert: variant.lowStockAlert,
          isLowStock: variant.isLowStock,
        });

        return acc;
      }, {})
    );

    return {list : serializePrisma(products), newCursor}; 
  });
};
