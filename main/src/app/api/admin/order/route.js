
import { serializePrisma } from "@/app/helpers/serializePrisma";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { Status as StatusRef} from "@/generated/prisma/enums";
import { adminOrderService } from "@/app/lib/services/Ably/adminOrdersService";

import { ApiTryCatch} from "@/app/helpers/TryCatch";
import { resError, resSuccess } from "@/app/helpers/resObj";



export async function GET(req) {
  return ApiTryCatch( async () => {
    // export const getAdminOrders = async ({status, search, cursor}) => {
  
    // const session = await getServerSession(authOptions); 
    
    // if(!session || !se
    // ssion.user.email !== "") return resError("Unauthorized request");
    
    const searchParams = req.nextUrl.searchParams;
    const cursor = searchParams.get('cursor') ?? '';
    const status = searchParams.get('staus') ?? '';
    const search = searchParams.get('search') ?? '';
    

    if (status !== "All" && !Object.values(StatusRef).includes(status)) {
      return resError("Invalid status filter provided", null, 400, true); 
    }

    const {orders, newCursor} = await adminOrderService({cursor, search, status});

    return resSuccess({list : serializePrisma(orders) , newCursor : serializePrisma(newCursor)}, 200, true);
    
  },"getAdminOrders" )
}
    
