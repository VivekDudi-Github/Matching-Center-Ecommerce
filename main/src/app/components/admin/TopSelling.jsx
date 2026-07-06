"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Premium Cotton White",
    category: "Cotton",
    sold: "245 m",
    revenue: "₹24,500",
  },
  {
    id: 2,
    name: "Linen Blue",
    category: "Linen",
    sold: "182 m",
    revenue: "₹19,300",
  },
  {
    id: 3,
    name: "Printed Rayon",
    category: "Rayon",
    sold: "165 m",
    revenue: "₹15,800",
  },
  {
    id: 4,
    name: "Silk Blend",
    category: "Silk",
    sold: "142 m",
    revenue: "₹18,200",
  },
];

export default function TopProducts() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Top Selling Fabrics
          </h2>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Best performers this month
          </p>
        </div>

        <Star className="text-yellow-500" />
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group flex items-center justify-between rounded-xl border border-zinc-200 p-4 transition hover:border-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <div>
              <h3 className="font-medium text-zinc-900 dark:text-white">
                {product.name}
              </h3>

              <p className="text-sm text-zinc-500">
                {product.category}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-zinc-900 dark:text-white">
                {product.sold}
              </p>

              <p className="text-sm text-zinc-500">
                {product.revenue}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 py-3 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
        View Analytics
        <ArrowUpRight size={16} />
      </button>
    </motion.div>
  );
}