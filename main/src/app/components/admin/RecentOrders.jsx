"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
} from "lucide-react";

const orders = [
  {
    id: "#1024",
    customer: "Amit Sharma",
    amount: "₹2,450",
    items: 3,
    status: "Pending",
    date: "Today",
  },
  {
    id: "#1023",
    customer: "Neha Verma",
    amount: "₹5,120",
    items: 6,
    status: "Processing",
    date: "Today",
  },
  {
    id: "#1022",
    customer: "Rahul Singh",
    amount: "₹1,980",
    items: 2,
    status: "Delivered",
    date: "Yesterday",
  },
  {
    id: "#1021",
    customer: "Priya Jain",
    amount: "₹3,650",
    items: 5,
    status: "Shipped",
    date: "Yesterday",
  },
  {
    id: "#1020",
    customer: "Ankit Gupta",
    amount: "₹890",
    items: 1,
    status: "Cancelled",
    date: "2 days ago",
  },
];

const statusConfig = {
  Pending: {
    icon: Clock3,
    className:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400",
  },
  Processing: {
    icon: ArrowUpRight,
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  },
  Shipped: {
    icon: Truck,
    className:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400",
  },
  Delivered: {
    icon: CheckCircle2,
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  },
  Cancelled: {
    icon: XCircle,
    className:
      "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
  },
};

export default function RecentOrders() {
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

        <button className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
          View All
        </button>
      </div>

      {/* Desktop Table */}

      <div className="hidden overflow-x-auto lg:block">
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
                Items
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
              const StatusIcon = statusConfig[order.status].icon;

              return (
                <tr
                  key={order.id}
                  className="border-b border-zinc-100 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
                >
                  <td className="px-6 py-5 font-semibold text-zinc-900 dark:text-white">
                    {order.id}
                  </td>

                  <td className="px-6 py-5 text-zinc-600 dark:text-zinc-300">
                    {order.customer}
                  </td>

                  <td className="px-6 py-5 text-zinc-600 dark:text-zinc-300">
                    {order.items}
                  </td>

                  <td className="px-6 py-5 font-medium text-zinc-900 dark:text-white">
                    {order.amount}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusConfig[order.status].className}`}
                    >
                      <StatusIcon size={14} />
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-zinc-500 dark:text-zinc-400">
                    {order.date}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}

      <div className="space-y-4 p-4 lg:hidden">
        {orders.map((order) => {
          const StatusIcon = statusConfig[order.status].icon;

          return (
            <div
              key={order.id}
              className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-zinc-900 dark:text-white">
                  {order.id}
                </h3>

                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusConfig[order.status].className}`}
                >
                  <StatusIcon size={14} />
                  {order.status}
                </span>
              </div>

              <div className="space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
                <p>{order.customer}</p>
                <p>{order.items} Items</p>
                <p>{order.amount}</p>
                <p className="text-zinc-500">{order.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}