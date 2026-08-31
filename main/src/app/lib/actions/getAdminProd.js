'use server';

import { serializePrisma } from "@/app/hooks/serializePrisma";

export const getMoreAdminProdList = async(cursor) => { 
  if (!cursor) {
    return { list: [], newCursor: null, error: "Invalid or missing cursor position." };
  }

  const products = await prisma.product.findMany({
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

  console.log("PRODUCTS:", products.length);
  const newCursor = products.length > 10 ? products[9].id : null;
  if(newCursor) products.pop();

  return {list : serializePrisma(products), newCursor};
}

export const getAdminProd = async(id) => {
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
    },
  });
  return serializePrisma(product);
}