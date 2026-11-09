import OrderToolbar from "@/app/components/admin/orders/OrdersToolbar";
import OrdersTable from "@/app/components/admin/orders/OrdersTable";
import { exfn } from "@/app/helpers/extractActions";
import { getAdminOrders } from "@/app/lib/controller/admin/getAdminOrder";
import { Loader2, LoaderIcon } from "lucide-react";


export default async function OrdersPage({searchParams}) {
  let orders = [] , cursor = null, errorMsg = null;
  let isLoading = true;
  try {
    isLoading = true;
    const query = await searchParams;
      
      const {list, newCursor} = await exfn(() => getAdminOrders({status: query?.status || "All", search: query?.search}));
      orders = list;
      cursor = newCursor;
      
  } catch (error) {
    errorMsg = error?.message || "Something went wrong while fetching."
    console.log("error in rending orders page at admin", error);
  } finally{
    isLoading = false;
  }

  return (
    <div className="space-y-6">
      {/* Heading */}

      <div>
        <h1 className="lg:text-3xl text-xl  font-bold tracking-tight text-zinc-900 dark:text-white">
          Orders
        </h1>

        <p className="mt-1 text-zinc-500 dark:text-zinc-400 text-base">
          View and manage customer orders.
        </p>
      </div>

      {/* Toolbar */}

      <OrderToolbar />

      {/* Table */}
      {isLoading && 
        <div className="flex justify-center gap-2">
          <LoaderIcon className="animate-pulse " />
          Loading...
        </div>
      }
      <OrdersTable initialOrders={orders} initialCursor={cursor} errorMsg={errorMsg}/>
    </div>
  );
}