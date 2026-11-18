import { serializePrisma } from "@/app/helpers/serializePrisma";
import { ApiTryCatch } from "@/app/helpers/TryCatch";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { prisma } from "@/app/lib/prisma";
import { requireUser } from "@/app/helpers/auth";

export async function GET(req) {
  return ApiTryCatch(async (user) => {
    const email = user.email;

    if (!email) {
      return resError("Email is required", null, 400, true);
    }

    const customer = await prisma.customer.findUnique({
      where: {
        email
      }
    });
    return resSuccess(serializePrisma(customer), 200, true);
  }, "getCustomerByEmail", requireUser);
}
