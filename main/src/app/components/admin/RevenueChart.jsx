"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

export default function RevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Revenue Overview
          </h2>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Last 30 days
          </p>
        </div>

        <BarChart3 className="text-zinc-500" />
      </div>

      <div className="flex h-80 items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700">
        <p className="text-zinc-500 dark:text-zinc-400">
          Revenue Chart
        </p>
      </div>
    </motion.div>
  );
}