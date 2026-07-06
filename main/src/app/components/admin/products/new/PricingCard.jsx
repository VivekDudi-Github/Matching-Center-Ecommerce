"use client";

import { IndianRupee, Percent } from "lucide-react";

export default function PricingCard() {
  return (
    <section className="rounded-2xl bg-white shadow-sm border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 p-6">
        <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-2">
          <IndianRupee className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Pricing
          </h2>

          <p className="text-sm text-zinc-500">
            Set pricing for this fabric.
          </p>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {/* Prices */}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Selling Price (₹ / meter)
            </label>

            <input
              type="number"
              placeholder="350"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Original Price
            </label>

            <input
              type="number"
              placeholder="450"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>
        </div>

        {/* Discount */}

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-950 dark:border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <Percent className="text-green-600" />

            <div>
              <p className="font-medium text-zinc-900 dark:text-white">
                Discount
              </p>

              <p className="text-sm text-zinc-500">
                Automatically calculated from prices.
              </p>
            </div>
          </div>

          <div className="mt-4 text-3xl font-bold text-green-600">
            22%
          </div>
        </div>

        {/* GST */}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              GST (%)
            </label>

            <select className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white">
              <option>0%</option>
              <option>5%</option>
              <option>12%</option>
              <option>18%</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Unit
            </label>

            <input
              value="Per Meter"
              readOnly
              className="w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}