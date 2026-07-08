"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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

export default function OrderRow({ order }) {
  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{
        backgroundColor: "rgba(0,0,0,0.02)",
      }}
      className="border-b border-zinc-400 dark:border-zinc-700"
    >
      {/* Order */}

      <td className="px-6 py-5 font-semibold text-zinc-900 dark:text-white">
        {order.id}
      </td>

      {/* Customer */}

      <td className="px-6 py-5">
        <div>
          <p className="font-medium text-zinc-900 dark:text-white">
            {order.customer}
          </p>

          <p className="text-sm text-zinc-500">
            {order.phone}
          </p>
        </div>
      </td>

      {/* Amount */}

      <td className="px-6 py-5 font-semibold text-zinc-900 dark:text-white">
        ₹{order.amount}
      </td>

      {/* Payment */}

      <td className="px-6 py-5">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            paymentColors[order.payment]
          }`}
        >
          {order.payment}
        </span>
      </td>

      {/* Status */}

      <td className="px-6 py-5 text-center">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusColors[order.status]
          }`}
        >
          {order.status}
        </span>
      </td>

      {/* Date */}

      <td className="px-6 py-5 text-zinc-600 dark:text-zinc-300">
        {order.date}
      </td>

      {/* Action */}

      <td className="px-6 py-5">
        <div className="flex justify-end">
          <Link
            href={`/admin/orders/${order.id.replace("#", "")}`}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <Eye size={16} />

            View
          </Link>
        </div>
      </td>
    </motion.tr>
  );
}