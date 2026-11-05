"use server";

import { TryCatch } from "@/app/helpers/TryCatch";
import { checkLowStockCount, getProdCountService, getRevenueCount } from "../services/DashboardService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { resError, resSuccess } from "@/app/helpers/resObj";
import { serializePrisma } from "@/app/helpers/serializePrisma";
import { positive } from "zod";

export const getDashboard = async () => {
    return TryCatch( async () => {
      const session = await getServerSession(authOptions); 


      // if(!session || !session.user.email !== "") return resError("Unauthorized request");
      
      const prodCount = await getProdCountService();
      const lowStockCount = await checkLowStockCount();

      const payments = await getRevenueCount();

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
        }
      })
    })
}