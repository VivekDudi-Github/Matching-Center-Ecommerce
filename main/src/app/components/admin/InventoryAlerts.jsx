
"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const items = [
  {
    id: 1,
    name: "Premium Cotton White",
    stock: "2.5 m",
  },
  {
    id: 2,
    name: "Printed Rayon Blue",
    stock: "1.4 m",
  },
  {
    id: 3,
    name: "Silk Floral",
    stock: "0.9 m",
  },
  {
    id: 4,
    name: "Denim Fabric",
    stock: "3.0 m",
  },
];

export default function InventoryAlerts() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-center gap-2 border-b border-zinc-200 p-6 dark:border-zinc-800">
        <AlertTriangle className="text-orange-500" />

        <div>
          <h2 className="text-lg font-semibold">
            Inventory Alerts
          </h2>

          <p className="text-sm text-zinc-500">
            Products running low
          </p>
        </div>
      </div>

      <div className="space-y-3 p-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-zinc-200 p-4 transition hover:border-orange-300 hover:bg-orange-50 dark:border-zinc-800 dark:hover:border-orange-700 dark:hover:bg-orange-500/5"
          >
            <p className="font-medium">{item.name}</p>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-zinc-500">
                Remaining
              </span>

              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600 dark:bg-red-500/15 dark:text-red-400">
                {item.stock}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}