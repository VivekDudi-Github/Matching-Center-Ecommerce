"use client";

import { motion } from "framer-motion";
import { PackageOpen } from "lucide-react";

import ProductRow from "./ProductRow";
import ProductCard from "./ProductCard";

export default function ProductTable({ products = [] }) {
  if (!products.length) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-16 text-center dark:border-zinc-700 dark:bg-zinc-900">
        <PackageOpen
          size={60}
          className="mx-auto mb-5 text-zinc-400"
        />

        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
          No Products Found
        </h2>

        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Add your first product to start selling fabrics.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm lg:block dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Price / m
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Stock
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Featured
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Mobile */}

      <div className="space-y-4 lg:hidden">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
}