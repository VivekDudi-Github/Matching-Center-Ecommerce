import "server-only";
import { prisma } from "@/app/lib/prisma";

  const LIMIT = 6;
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // comes as indexes fdrom 0-11

  const thisMonthFirst = new Date(currentYear, currentMonth, 1);
  const lastMonthFirst = new Date(currentYear, currentMonth - 1, 1);


const getProdCountService = async () => {
  const thisMonethsProds = await prisma.product.count({
    where: {
      isPublished: true ,
      deletedAt : null,
      updatedAt : {
        gte : thisMonthFirst
      }
    }
  })
  const lastMonethsProds = await prisma.product.count({
    where: {
      isPublished: true,
      deletedAt : null,
      updatedAt: {
        gte: lastMonthFirst,
        lt: thisMonthFirst
      }
    }
  })

  console.log("Prod count", thisMonethsProds, lastMonethsProds)
  return {thisMonethsProds , lastMonethsProds};
}

const checkLowStockCount = async () => {

  const lowStockProducts = await prisma.productVariant.count({
    where: {
      isLowStock : true
    }
  })
  console.log("lowStockProducts", lowStockProducts);
  return lowStockProducts;
}


const getRevenueCount = async () => {

  const thisMoenthPaymentStats = await prisma.payment.aggregate({
    where : {
      status : "Paid",
      createdAt: {
        gte: thisMonthFirst,
      },
    },
    _count:{
      amount: true
    },
    _sum: {
      amount: true, 
    },
  });

    const LastMoenthPaymentStats = await prisma.payment.aggregate({
    where : {
      status : "Paid",
      createdAt: {
        gte: lastMonthFirst,
        lt: thisMonthFirst,
      }
    },
    _count:{
      amount: true
    },
    _sum: {
      amount: true, 
    },
  });


  console.log(`Total Value: ${thisMoenthPaymentStats._sum.amount}`, thisMoenthPaymentStats._count.amount);
  console.log(`Total Value: ${LastMoenthPaymentStats._sum.amount}`, LastMoenthPaymentStats._count.amount);

  return {thisMoenthPaymentStats, LastMoenthPaymentStats};
}

const getInventryAlerts = async ({cursor}) => {
  const cursorFilter = cursor ? {
    cursor: {
      id : cursor
    }
  } : {};

  const alerts = await prisma.productVariant.findMany({
    where: {
      isLowStock: true,
      product: {
        isPublished : true,
        deletedAt : null
      }
    },
    ...cursorFilter,
    take : LIMIT,
    include: {
      product: {
        select : {
          title : true,
          id: true
        },
      }
    },
  })
  
  let newCursor = null;
  if(alerts.length === LIMIT ){
    newCursor = alerts.at(-1).id;
    alerts.pop();
  }

  return {alerts, newCursor};
}

const getCancelRequestAlerts = async() => {
  const alerts = await prisma.order.findMany({
    where: {
      status: "CancelRequested",
      payment: {
        status: "Paid"
      }
    },
    include : {
      payment: {
        select: {
          updatedAt: true,
          status: true,
          amount : true
        }
      },
      customer: {
        select : {
          name: true
        }
      }
    }
  })
  return alerts;
}

export {
  
  getProdCountService,
  getRevenueCount,
  checkLowStockCount,
  getInventryAlerts,
  getCancelRequestAlerts
}