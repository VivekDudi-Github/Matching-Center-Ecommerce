import { serializePrisma } from "@/app/helpers/serializePrisma";
import { ApiTryCatch } from "@/app/helpers/TryCatch";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/helpers/auth";

export async function GET(req, { params }) {
  return await ApiTryCatch(async () => {
    const { id } = await params;
    if (!id) return resError("Product Id is missing", null, 400, true);

    const product = await prisma.product.findUnique({
      where: {
        id: id
      },
      include: {
        color: true,
        tags: true,
        category: true,
        images: true,
      },
    });
    return resSuccess(serializePrisma(product), 200, true);
  }, "getAdminProdById", requireAdmin);
} 
