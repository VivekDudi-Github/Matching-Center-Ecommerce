import { serializePrisma } from "@/app/helpers/serializePrisma";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { ApiTryCatch } from "@/app/helpers/TryCatch";
import { requireUser } from "@/app/helpers/auth";
import { prisma } from "@/app/lib/prisma";

export async function GET(req, { params }) {
  return ApiTryCatch(async (user) => {
    const { id } = await params;
    if (!id) {
      return resError("Order Id is missing", null, 400, true);
    }

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
                id: true,
                url: true,
                isVideo: true,
                publicId: true,
              }
            }
          }
        },
        payment: true,
        address: true,
      },
    });

    if (!order) {
      return resError("Order not found", null, 404, true);
    }

    return resSuccess(serializePrisma(order), 200, true);
  }, "getOrderById", requireUser);
}
