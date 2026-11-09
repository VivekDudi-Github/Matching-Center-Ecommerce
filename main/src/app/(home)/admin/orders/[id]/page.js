import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import CustomerCard from "@/app/components/admin/orders/details/CutomerCard";
import AddressCard from "@/app/components/admin/orders/details/AddressCard";
import PaymentCard from "@/app/components/admin/orders/details/PaymentCard";
import StatusCard from "@/app/components/admin/orders/details/StatusCard";
import ProductsCard from "@/app/components/admin/orders/details/ProductsCard";
import { getAdminOrderById } from "@/app/lib/controller/admin/getAdminOrder";
import { exfn } from "@/app/helpers/extractActions";
import OrderStatus from "@/app/components/orders/OrderStatus";

const ORDER = {
  id: "1001",
  status: "Pending",
  date: "08 Jul 2026",

  customer: {
    name: "Rahul Sharma",
    phone: "9876543210",
  },

  address: {
    village: "Rampura",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302001",
  },

  payment: {
    method: "UPI",
    status: "Paid",
    amount: 3250,
  },

  items: [
    {
      id: 1,
      name: "Premium Cotton White",
      image:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300",
      quantity: 5,
      unit: "m",
      price: 250,
    },
    {
      id: 2,
      name: "Linen Blue",
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300",
      quantity: 3,
      unit: "m",
      price: 420,
    },
  ],
};

export default async function OrderDetailsPage({params}) {
  let order = null;
  let creationTime = "Loading..."
  let id = null;
  try {
    const query = await params;
    id = query?.id
    order = await exfn(() => getAdminOrderById(query?.id));
    creationTime = new Date(order?.payment?.updatedAt).toLocaleString(undefined, {dateStyle:"medium", timeStyle: "short"});
  } catch (error) {
    console.log("error in order fetching", error);
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/admin/orders"
            className="mb-3 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </Link>

          {!order && (
            <div className="text-red-400 text-base font-semibold">
              Order not Found
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl bg-zinc-300 dark:bg-zinc-950 rounded-md p-2 font-bold flex text-zinc-900 dark:text-white">
              Order  #{order?.id} 
  
            </h1>

            <OrderStatus type={"delivery"} status={order?.state}/>
          </div>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Placed on {creationTime}
          </p>
        </div>
      </div>

      {/* Top Grid */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CustomerCard customer={order?.customer} />

        <PaymentCard payment={order?.payment} />

        <AddressCard address={order?.address} notes={order?.notes} />

        <StatusCard status={order?.status} id={id} />
      </div>

      {/* Products */}

      <ProductsCard
        order={order}
        products={order?.orderItems}
        payment={order?.payment}
      />
    </div>
  );


}