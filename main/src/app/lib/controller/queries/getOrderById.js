import { prisma } from "@/app/lib/prisma";
import { serializePrisma } from "@/app/helpers/serializePrisma";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { TryCatch } from "@/app/helpers/TryCatch";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import "server-only";

export const getOrderById = async (id) => {
  if (!id) return resError("Order Id is missing");

  return await TryCatch(async () => {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user) return resError("Please login to view order");

    const userId = session?.user?.id;
    if (!userId) return resError("Something went wrong please logIn again.");

    const order = await prisma.order.findUnique({
      where: {
        id: id,
        customerId: userId
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
  });
};

export const getUserOrders = async (cursor) => {
  return await TryCatch(async () => {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user) return resError("Please login to view orders");

    const userId = session?.user?.id;
    if (!userId) return resError("User credential is missing");

    const { fetchOrdersByCustomerIdService } = await import("@/app/lib/services/fetchOrderService");
    return resSuccess(await fetchOrdersByCustomerIdService({ customerId: userId, cursor }));
  });
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
