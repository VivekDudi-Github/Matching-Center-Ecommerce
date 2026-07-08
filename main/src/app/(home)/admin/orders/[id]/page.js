import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import CustomerCard from "@/app/components/admin/orders/details/CutomerCard";
import AddressCard from "@/app/components/admin/orders/details/AddressCard";
import PaymentCard from "@/app/components/admin/orders/details/PaymentCard";
import StatusCard from "@/app/components/admin/orders/details/StatusCard";
import ProductsCard from "@/app/components/admin/orders/details/ProductsCard";

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

export default function OrderDetailsPage() {
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

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Order #{ORDER.id}
            </h1>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400">
              {ORDER.status}
            </span>
          </div>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Placed on {ORDER.date}
          </p>
        </div>
      </div>

      {/* Top Grid */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CustomerCard customer={ORDER.customer} />

        <PaymentCard payment={ORDER.payment} />

        <AddressCard address={ORDER.address} />

        <StatusCard status={ORDER.status} />
      </div>

      {/* Products */}

      <ProductsCard
        products={ORDER.items}
        payment={ORDER.payment}
      />
    </div>
  );
}