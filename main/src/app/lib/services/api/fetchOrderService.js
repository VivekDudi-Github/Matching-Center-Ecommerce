import "server-only";
import { serializePrisma } from '@/app/helpers/serializePrisma';
import { prisma } from '@/app/lib/prisma';
import { ApiError } from '@/app/helpers/resObj';

const LIMIT = 10;

export const fetchOrdersByCustomerIdService = async({customerId, cursor}) => {
  try {
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
        id: "desc"
      },
      ...cursorFilter,
      take: LIMIT,
      skip: cursor ? 1 : 0,
      include: {
        orderItems: {
          include: {
            image: {
              select: {
                url: true,
                isVideo: true,
                publicId: true,
              }
            }
          }
        },
        payment: true
      }
    });

    let newCursor = orders.length === LIMIT ? orders[orders.length - 1].id : null;

    return {orders: serializePrisma(orders), cursor: newCursor};
  } catch (error) {
    console.error("Error in fetchOrdersByCustomerIdService:", error);
    throw new ApiError("Failed to fetch orders", 500);
  }
}
