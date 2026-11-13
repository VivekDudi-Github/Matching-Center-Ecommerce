
import { ApiTryCatch, TryCatch } from "@/app/helpers/TryCatch";
import { getInventryAlerts } from "@/app/lib/services/dashboardService";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { serializePrisma } from "@/app/helpers/serializePrisma";



// export const  = async ({cursor}) => {
  
export async function GET(req) {
  return ApiTryCatch( async() => {
    
  const searchParams = req.nextUrl.searchParams;
  const cursor = searchParams.get('cursor') ?? '';

  
    if(!cursor || !cursor.length) return resError("No cursor found", null, 400,true);

    const {alerts, newCursor} = await getInventryAlerts({ cursor});
     
    return resSuccess({alerts : serializePrisma(alerts) , cursor: serializePrisma(newCursor) }, 200,true);
  }, "getInventroyAlerts", true)
}