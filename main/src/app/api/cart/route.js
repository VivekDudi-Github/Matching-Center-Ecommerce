import { serializePrisma } from "@/app/helpers/serializePrisma";
import { ApiTryCatch } from "@/app/helpers/TryCatch";
import { resSuccess } from "@/app/helpers/resObj";
import { prisma } from "@/app/lib/prisma";

export async function GET(req) {
  return ApiTryCatch(async () => {
    const searchParams = req.nextUrl.searchParams;
    const itemsParam = searchParams.get('items') ?? '';

    if (!itemsParam) return resSuccess([]);

    const items = itemsParam.split(',');

    if (!Array.isArray(items) || !items.length) return resSuccess([]);
    if (items.length > 15) return resSuccess([]);

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: items
        }
      },
      include: {
        images: {
          where: {
            displayOrder: 0
          },
          select: {
            url: true
          }
        },
        color: true,
        category: true,
        tags: true,
      }
    });

    return resSuccess(serializePrisma(products), 200, true);
  }, "updateCart");
}
