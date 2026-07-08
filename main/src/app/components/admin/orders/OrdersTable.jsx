"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

import OrderRow from "./OrderRow";
import OrderCard from "./OrderCard";

export default function OrdersTable({ orders = [] }) {
  if (!orders.length) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-16 text-center dark:border-zinc-700 dark:bg-zinc-900">
        <ShoppingBag
          size={60}
          className="mx-auto mb-4 text-zinc-400"
        />

        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
          No Orders Found
        </h2>

        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Orders will appear here once customers start placing them.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className=" rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="overflow-auto grid grid-cols-1 gap-6 ">
          <table className="min-w-full">
            <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Order
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Amount
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Payment
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Date
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className=" divide-y divide-x divide-zinc-800 dark:divide-zinc-100">
              {orders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Mobile */}

      {/* <div className="space-y-4 lg:hidden">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))}
      </div> */}
    </>
  );
}