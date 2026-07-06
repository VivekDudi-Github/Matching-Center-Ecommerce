"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group rounded-2xl border col-span-1 border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg shadow-pink-200 dark:shadow-pink-950/50 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {value}
          </h2>
        </div>

        <div className="rounded-xl bg-zinc-100 p-3 transition-colors group-hover:bg-zinc-900 dark:bg-zinc-800 dark:group-hover:bg-zinc-700">
          <Icon
            className="text-zinc-700 group-hover:text-white dark:text-zinc-300"
            size={22}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        {positive ? (
          <TrendingUp
            size={16}
            className="text-emerald-600 dark:text-emerald-400"
          />
        ) : (
          <TrendingDown
            size={16}
            className="text-red-500"
          />
        )}

        <span
          className={`text-sm font-medium ${
            positive
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-500"
          }`}
        >
          {change}
        </span>
      </div>
    </motion.div>
  );
}