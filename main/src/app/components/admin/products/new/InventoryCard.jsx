"use client";

import { Package2, AlertTriangle } from "lucide-react";

export default function InventoryCard() {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}

      <div className="flex items-center gap-3 border-b border-zinc-200 p-6 dark:border-zinc-800">
        <div className="rounded-xl bg-zinc-100 p-2 dark:bg-zinc-800">
          <Package2 className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Inventory
          </h2>

          <p className="text-sm text-zinc-500">
            Manage available stock and inventory alerts.
          </p>
        </div>
      </div>

      {/* Body */}

      <div className="space-y-6 p-6">
        <div className="grid gap-5 md:grid-cols-2">
          {/* Available Stock */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Available Stock (Meters)
            </label>

            <input
              type="number"
              step="0.01"
              placeholder="125.50"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
            />
          </div>

          {/* Low Stock */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Low Stock Alert
            </label>

            <input
              type="number"
              step="0.01"
              placeholder="20"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
            />
          </div>
        </div>

        {/* Inventory Summary */}

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm text-zinc-500">Available</p>

            <h3 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
              125.50 m
            </h3>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm text-zinc-500">Reserved</p>

            <h3 className="mt-2 text-2xl font-bold text-amber-500">
              8.50 m
            </h3>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm text-zinc-500">Sold</p>

            <h3 className="mt-2 text-2xl font-bold text-emerald-600">
              482 m
            </h3>
          </div>
        </div>

        {/* Alert */}

        <div className="flex items-start gap-3 rounded-xl border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-500/10">
          <AlertTriangle className="mt-0.5 text-yellow-600" size={18} />

          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            You'll receive a dashboard alert when stock falls below the configured threshold.
          </p>
        </div>
      </div>
    </section>
  );
}