import OrderToolbar from "@/app/components/admin/orders/OrdersToolbar";
import { LoaderIcon } from "lucide-react";

export default function loading(){
  return (
        <div className="space-y-6 -translate-y-16 ">
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

        <div className="flex justify-center gap-2">
          <LoaderIcon className="animate-pulse " />
          Loading...
        </div>
    </div>
  )
}