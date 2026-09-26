"use server";
import { serializePrisma } from '@/app/hooks/serializePrisma';
import { prisma } from '@/app/lib/prisma';


export const fetchOrdersByCustomerIdService = async({customerId, email, cursor}) => {
  const cursorFilter = cursor ? {
    cursor: {
      id: cursor
    }
  } : {};
  const where = customerId ? {
    id: customerId
  } : email ? {
    customer: {
      email: email
    }
  } : {};

  const orders = await prisma.order.findMany({
    where: {
      ...where
    },
    orderBy: {
      id: "desc",
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