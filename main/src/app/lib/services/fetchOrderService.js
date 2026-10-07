"use server";
import { serializePrisma } from '@/app/hooks/serializePrisma';
import { prisma } from '@/app/lib/prisma';


export const fetchOrdersByCustomerIdService = async({customerId, cursor}) => {
  const cursorFilter = cursor ? {
    cursor: {
      id: cursor
    }
  } : {};
  
  const orders = await prisma.order.findMany({
    where: {
      customerId : customerId
    },
    orderBy: {
      createdAt: "desc",
    },
    ...cursorFilter,
    take: 11,
    skip: cursor ? 1 : 0,
    include: {
      orderItems: {
        include: {
          image: {
            select: {
              url: true
            }
          },
        }
      },
      payment: true
    }
  });

  let newCursor = orders.length > 10 ? orders[orders.length - 1].id : null;
  if(newCursor) orders.pop();
  
  return {orders: serializePrisma(orders), cursor: newCursor};
}


export const fetchOrdersService = async(cursor) => {
  const cursorFilter = cursor ? {
    cursor: {
      id: cursor
    }
  } : {};

  const orders = await prisma.order.findMany({
    orderBy: {
      id: "desc",
    },
    ...cursorFilter,
    take: 11,
    skip: cursor ? 1 : 0,
    include: {
      orderItems: true,
    }
  });


  let newCursor = orders.length > 10 ? orders[orders.length - 1].id : null;
  if(newCursor) orders.pop();
  
  return {orders: serializePrisma(orders), cursor: newCursor};
}