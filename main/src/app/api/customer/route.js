import { serializePrisma } from "@/app/helpers/serializePrisma";
import { ApiTryCatch } from "@/app/helpers/TryCatch";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/prisma";

export async function GET(req) {
  return ApiTryCatch(async () => {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user) {
      return resError("Please login to view customer details", null, 401, true);
    }

    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get('email') ?? '';

    if (!email) {
      return resError("Email is required", null, 400, true);
    }

    const customer = await prisma.customer.findUnique({
      where: {
        email
      }
    });
    return resSuccess(serializePrisma(customer), 200, true);
  }, "getCustomerByEmail");
}
