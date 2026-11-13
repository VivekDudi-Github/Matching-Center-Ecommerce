
import { ApiTryCatch, TryCatch } from "@/app/helpers/TryCatch";
import { checkLowStockCount, getCancelRequestAlerts, getInventryAlerts, getProdCountService, getRevenueCount } from "@/app/lib/services/dashboardService";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { serializePrisma } from "@/app/helpers/serializePrisma";
import { adminOrderService } from "@/app/lib/services/Ably/adminOrdersService";


export async function GET() {
    return ApiTryCatch( async () => {
      // const session = await getServerSession(authOptions); 

      // Authentication
      // if (!session?.user) {
      //   return resError("Unauthorized request", null, 401, true);
      // }
      // if (session?.user?.role !== 'ADMIN') {
      //   return resError("Forbidden", null, 401, true);
      // }

      
      const [
        prodCount,
        lowStockCount,
        payments,
        orderData,
        inventoryData,
        cancelRequests,
      ] = await Promise.all([
        getProdCountService(),
        checkLowStockCount(),
        getRevenueCount(),
        adminOrderService({
          search: '',
          cursor: '',
          status: 'All',
        }),
        getInventryAlerts({ cursor: '' }),
        getCancelRequestAlerts(),
      ])


    const { orders } = orderData;
    const { alerts, newCursor } = inventoryData;

    const revenueChange = Math.floor((((payments?.thisMoenthPaymentStats?._sum?.amount ?? 0) - (payments?.LastMoenthPaymentStats?._sum?.amount ?? 0)) / payments?.LastMoenthPaymentStats?._sum?.amount) * 100);
      

      return resSuccess({
        Products : {
          value : serializePrisma(prodCount?.thisMonethsProds),
          change: (prodCount?.thisMonethsProds ?? 0) -(prodCount?.lastMonethsProds ?? 0) ,
          positive: (prodCount?.lastMonethsProds ?? 0) < (prodCount?.thisMonethsProds ?? 0)
        },
        lowStockCount: {
          value : serializePrisma(lowStockCount),
          positive: lowStockCount == 0,
          change: lowStockCount > 0 ? "Check Needed" : "All good"
        },
        Revenue: {
          change: serializePrisma(revenueChange.toFixed(2)),
          value: serializePrisma(payments?.thisMoenthPaymentStats?._sum?.amount),
          positive: revenueChange > 0
        },
        Orders: {
          value : serializePrisma(payments?.thisMoenthPaymentStats?._count?.amount ?? 0),
          change: serializePrisma(( (payments?.thisMoenthPaymentStats?._count?.amount ?? 0) - (payments?.LastMoenthPaymentStats?._count?.amount ?? 0) / (payments?.LastMoenthPaymentStats?._count?.amount ?? 0)) *100 ) ,
          positive: (payments?.thisMoenthPaymentStats?._count?.amount ?? 0) >= (payments?.LastMoenthPaymentStats?._count?.amount ?? 0)
        }, 
        recentorders: serializePrisma(orders) ,
        inventoryAlert : {
          alerts : serializePrisma(alerts), 
          newCursor: serializePrisma(newCursor)
        },
        cancelRequests: serializePrisma(cancelRequests)
      }, 200, true)
    
    }, "getDashBoard", true )
}
