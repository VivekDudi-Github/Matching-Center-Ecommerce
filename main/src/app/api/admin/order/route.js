
import { serializePrisma } from "@/app/helpers/serializePrisma";
import { Status as StatusRef} from "@/generated/prisma/enums";
import { adminOrderService } from "@/app/lib/services/Ably/adminOrdersService";

import { ApiTryCatch} from "@/app/helpers/TryCatch";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { RequestCookiesAdapter } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { requireAdmin } from "@/app/helpers/auth";



export async function GET(req) {
  return ApiTryCatch( async () => {
    const searchParams = req.nextUrl.searchParams;
    const cursor = searchParams.get('cursor') || undefined;
    const status = searchParams.get('status') ?? 'All';
    const search = searchParams.get('search') ?? '';
    

    if (status !== "All" && !Object.values(StatusRef).includes(status)) {
      return resError("Invalid status filter provided", null, 400, true); 
    }

    const {orders, newCursor} = await adminOrderService({cursor, search, status});

    return resSuccess({list : serializePrisma(orders) , newCursor : serializePrisma(newCursor)}, 200, true);
    
  },"getAdminOrders", requireAdmin )
}
    
