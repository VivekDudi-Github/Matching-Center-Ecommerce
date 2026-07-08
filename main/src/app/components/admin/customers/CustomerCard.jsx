"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Eye } from "lucide-react";

export default function CustomerCard({ customer }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-zinc-400 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {customer.name}
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            {customer.phone}
          </p>
        </div>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold dark:bg-zinc-800">
          {customer.orders} Orders
        </span>
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-500">Total Spent</span>

          <span className="font-semibold text-zinc-900 dark:text-white">
            ₹{customer.totalSpent.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-500">Last Order</span>

          <span className="text-zinc-900 dark:text-white">
            {customer.lastOrder}
          </span>
        </div>
      </div>

      <Link
        href={`/admin/customers/${customer.id}`}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 py-3 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
      >
        <Eye size={18} />
        View Customer
      </Link>
    </motion.div>
  );
}