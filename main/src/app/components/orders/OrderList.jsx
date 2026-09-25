"use client";

import { motion } from "framer-motion";
import { PackageOpen } from "lucide-react";
import OrderCard from "./OrderCard";

export default function OrdersList({ orders = [] }) {
  if (!orders.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white px-6 text-center dark:border-zinc-800 dark:bg-zinc-950"
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
          <PackageOpen size={26} />
        </div>

        <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
          No orders yet
        </h3>

        <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
          You haven't placed any orders yet. Your orders will appear here once
          you make a purchase.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="space-y-4"
    >
      {orders.map((order) => (
        <motion.div
          key={order.id}
          variants={{
            hidden: {
              opacity: 0,
              y: 12,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
              },
            },
          }}
        >
          <OrderCard order={order} />
        </motion.div>
      ))}
    </motion.div>
  );
}