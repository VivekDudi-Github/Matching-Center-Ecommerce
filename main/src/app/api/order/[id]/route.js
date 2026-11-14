import { serializePrisma } from "@/app/helpers/serializePrisma";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { ApiTryCatch } from "@/app/helpers/TryCatch";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/prisma";

export async function GET(req, { params }) {
  return ApiTryCatch(async () => {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user) {
      return resError("Please login to view order", null, 401, true);
    }

    const userId = session?.user?.id;
    if (!userId) {
      return resError("User credential is missing", null, 400, true);
    }

    const { id } = await params;
    if (!id) {
      return resError("Order Id is missing", null, 400, true);
    }

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

    if (!order) {
      return resError("Order not found", null, 404, true);
    }

    return resSuccess(serializePrisma(order), 200, true);
  }, "getOrderById");
}
