import { prisma } from "@/app/lib/prisma";
import { serializePrisma } from "@/app/helpers/serializePrisma";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { TryCatch } from "@/app/helpers/TryCatch";
import { requireUser } from "@/app/helpers/auth";
import "server-only";

export const getOrderById = async (id) => {
  if (!id) return resError("Order Id is missing");

  return await TryCatch(async (user) => {
    const order = await prisma.order.findUnique({
      where: {
        id: id,
        customerId: user.id
      },
      include: {
        customer: true,
        orderItems: {
          include: {
            image: {
              select: {
                url: true
              }
            }
          }
        },
        payment: true,
        address: true,
      },
    });
    if (!order) return resError("Order not found");

    return resSuccess(serializePrisma(order));
  }, requireUser);
};

export const getUserOrders = async (cursor) => {
  return await TryCatch(async (user) => {
    const { fetchOrdersByCustomerIdService } = await import("@/app/lib/services/fetchOrderService");
    return resSuccess(await fetchOrdersByCustomerIdService({ customerId: user.id, cursor }));
  }, requireUser);
};

export const getOrdersByCustomerId = async (customerId, cursor) => {
  if (!customerId) return resError("Customer Id is missing");
  return await TryCatch(async () => {
    const { fetchOrdersByCustomerIdService } = await import("@/app/lib/services/fetchOrderService");
    return resSuccess(
      await fetchOrdersByCustomerIdService({ customerId, cursor })
    );
  });
};
