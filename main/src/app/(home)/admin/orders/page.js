import OrderToolbar from "@/app/components/admin/orders/OrdersToolbar";
import OrdersTable from "@/app/components/admin/orders/OrdersTable";
import { serializePrisma } from "@/app/helpers/serializePrisma";
import { exfn } from "@/app/helpers/extractActions";
import { getFirstAdminProdList } from "@/app/lib/controller/getAdminProd";


export default async function OrdersPage({searchParams}) {

  const query = await searchParams;
  
  const {list, newCursor} = await exfn(() => {});
  const orders = list;
  const cursor = "newCursor";

  return (
    <div className="space-y-6">
      {/* Heading */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Orders
        </h1>

        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          View and manage customer orders.
        </p>
      </div>

      {/* Toolbar */}

      <OrderToolbar />

      {/* Table */}

      <OrdersTable orders={(orders)} initialCursor={cursor}/>
    </div>
  );
}