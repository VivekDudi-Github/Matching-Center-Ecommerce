"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Eye } from "lucide-react";

export default function CustomerRow({ customer }) {
  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
      className="border-b border-zinc-100 dark:border-zinc-800"
    >
      <td className="px-6 py-5">
        <p className="font-medium text-zinc-900 dark:text-white">
          {customer.name}
        </p>
      </td>

      <td className="px-6 py-5 text-zinc-600 dark:text-zinc-300">
        {customer.phone}
      </td>

      <td className="px-6 py-5 text-center font-semibold text-zinc-900 dark:text-white">
        {customer.orders}
      </td>

      <td className="px-6 py-5 font-semibold text-zinc-900 dark:text-white">
        ₹{customer.totalSpent.toLocaleString()}
      </td>

      <td className="px-6 py-5 text-zinc-600 dark:text-zinc-300">
        {customer.lastOrder}
      </td>

      <td className="px-6 py-5">
        <div className="flex justify-end">
          <Link
            href={`/admin/customers/${customer.id}`}
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