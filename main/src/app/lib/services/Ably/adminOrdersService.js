import "server-only";
import {prisma} from "@/app/lib/prisma";
import z from "zod";

const LIMIT = 11;

export const adminOrderService = async ({cursor, search, status}) => {

    const cursorFilter = cursor ? {
      cursor : {
        id : cursor
      }
    } : {} ;
    

    const statusFilter = status !== "All" ? { status } : {};
    const v7Schema = z.uuidv7();

    let isId = v7Schema.safeParse(search);
    isId = !!isId.success ;  

    // provides the filter based on either id or text based
    const searchFIlter = isId ? {
      id : search
    } : search ? {
      customer : {
        name : {
          contains : search,
          mode: "insensitive"
        }
      }
    } : {} ;

    // show all the orders if there is an query added  
    const paymentStatusFilter = Object.keys(searchFIlter).length > 0  ? 
        [] : 
        [
          {status: "Paid"},
          {status: "Refunded"}
        ] ;

    const orders = await prisma.order.findMany({
      where: {
        payment: {
          OR: paymentStatusFilter
        },
        ...statusFilter ,
        ...searchFIlter
      },
      orderBy: {
        id: "desc"
      },
      ...cursorFilter,
      skip: cursor ? 1: 0,
      take: !cursor ? 6 : LIMIT ,
      include: {
        customer: true,
        payment: true,
      }
    })

    let newCursor = null;
    if(orders.length === 6) {
      newCursor = orders.at(-2).id;
      orders.pop();
    }

    return {orders, newCursor};
}
