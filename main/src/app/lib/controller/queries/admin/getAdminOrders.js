
import { TryCatch } from "@/app/helpers/TryCatch";
import { serializePrisma } from "@/app/helpers/serializePrisma";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { Status as StatusRef} from "@/generated/prisma/enums";
import { adminOrderService } from "@/app/lib/services/api/Ably/adminOrdersService";
import { requireAdmin } from "@/app/helpers/auth";




export const getAdminOrders = async ({status, search, cursor}) => {
  return TryCatch( async () => {
      if (status !== "All" && !Object.values(StatusRef).includes(status)) {
        return resError("Invalid status filter provided");
      }
      const {orders, newCursor} = await adminOrderService({cursor, search, status});

      return resSuccess({list : serializePrisma(orders) , newCursor : serializePrisma(newCursor)});
  }, requireAdmin)
}

