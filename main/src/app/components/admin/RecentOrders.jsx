"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import Link from "next/link";
import OrderStatus from "../orders/OrderStatus";
import { useState } from "react";
import { Check, Copy } from "lucide-react";


export default function RecentOrders({orders = []}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async (order) => {
    try {
      await navigator.clipboard.writeText(order.id);
      setCopied(order.id);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy ID: ", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-zinc-200 p-6 dark:border-zinc-800">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Latest customer purchases
          </p>
        </div>

        <Link href={"/admin/orders"} className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
          View All
        </Link>
      </div>

      {/* Desktop Table */}

      <div className=" overflow-x-auto hidden lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Order
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const date = format(order?.payment?.updatedAt,'LLLL d, yyyy');
              return (
                <tr
                  key={order.id}
                  className="border-b relative border-zinc-100 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
                >
                  <td className="px-6 py-5 font-semibold text-zinc-900 dark:text-white">                 
                    <h3 title={order?.id} className="font-semibold w-fit text-zinc-300 dark:text-white truncate dark:bg-zinc-950 border border-amber-700/50 dark:hover:border-amber-200/50 bg-zinc-950 p-2 rounded-xs   group relative overflow-hidden   px-4 py-2.5 text-sm tracking-wide shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-300 cursor-pointer">
                      ID: {order?.id.slice(0, 8)}...
                      <button
                        type="button"
                        onClick={() => handleCopy(order)}
                        className="shrink-0  pl-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded transition-colors"
                        title="Copy Order ID"
                      >
                        {copied === order?.id ? (
                          <Check size={14} className="text-emerald-500" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </h3>
                  </td>

                  <td className="px-6 py-5 text-zinc-600 dark:text-zinc-300">
                    {order.customer.name}
                  </td>


                  <td className="px-6 py-5 font-medium text-zinc-900 dark:text-white">
                    ₹{order?.payment?.amount}
                  </td>

                  <td className="px-6 py-5">
                      <OrderStatus type={"delivery"} status={order?.status} />
                  </td>

                  <td className="px-6 py-5 text-zinc-500 dark:text-zinc-400">
                    {date}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}

      <div className="space-y-4  lg:hidden">
        {orders.map((order) => {
          const date = format(order?.payment?.updatedAt,'LLLL d, yyyy');

          return (
            <div
              key={order.id}
              className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 title={order?.id} className="font-semibold w-fit text-zinc-300 dark:text-white truncate dark:bg-zinc-950 border border-amber-700/50 dark:hover:border-amber-200/50 bg-zinc-950 p-2 rounded-xs   group relative overflow-hidden   px-4 py-2.5 text-sm tracking-wide shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-300 cursor-pointer">
                  ID: {order?.id.slice(0, 8)}...
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="shrink-0  pl-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded transition-colors"
                    title="Copy Order ID"
                  >
                    {copied ? (
                      <Check size={14} className="text-emerald-500" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </h3>
                <OrderStatus status={order.status} type={"delivery"} />
              </div>

              <div className="space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
                <p>{order?.customer?.name}</p>
                <p>₹{order?.payment?.amount}</p>
                <p className="text-zinc-500">{date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}