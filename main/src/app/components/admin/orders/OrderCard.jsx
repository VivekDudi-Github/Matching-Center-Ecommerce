"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

const statusColors = {
  Pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",

  Processing:
    "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",

  Shipped:
    "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400",

  Delivered:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",

  Cancelled:
    "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

const paymentColors = {
  Paid:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",

  COD:
    "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",

  Failed:
    "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

export default function OrderCard({ order }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {order.id}
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            {order.date}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusColors[order.status]
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-500">Customer</span>

          <span className="font-medium text-zinc-900 dark:text-white">
            {order.customer}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-500">Phone</span>

          <span className="text-zinc-900 dark:text-white">
            {order.phone}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-500">Amount</span>

          <span className="font-semibold text-zinc-900 dark:text-white">
            ₹{order.amount}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-zinc-500">Payment</span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              paymentColors[order.payment]
            }`}
          >
            {order.payment}
          </span>
        </div>
      </div>

      <Link
        href={`/admin/orders/${order.id.replace("#", "")}`}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 py-3 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
      >
        <Eye size={18} />

        View Order
      </Link>
    </motion.div>
  );
}