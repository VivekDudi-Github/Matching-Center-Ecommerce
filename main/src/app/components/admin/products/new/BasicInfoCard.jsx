"use client";

import { Tag, Package } from "lucide-react";

export default function BasicInfoCard() {
  return (
    <section className="rounded-2xl bg-white shadow-sm border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 p-6">
        <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-2">
          <Package className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Basic Information
          </h2>
          <p className="text-sm text-zinc-500">
            General details about the product.
          </p>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {/* Product Name */}

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Product Name
          </label>

          <input
            type="text"
            placeholder="Premium Cotton Fabric"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>

        {/* Category */}

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Category
          </label>

          <select className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white">
            <option>Cotton</option>
            <option>Silk</option>
            <option>Linen</option>
            <option>Rayon</option>
            <option>Polyester</option>
          </select>
        </div>

        {/* SKU */}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              SKU
            </label>

            <input
              placeholder="FAB-001"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Slug
            </label>

            <input
              placeholder="premium-cotton-fabric"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>
        </div>

        {/* Featured */}

        <div className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <Tag className="text-amber-500" />

            <div>
              <p className="font-medium text-zinc-900 dark:text-white">
                Featured Product
              </p>

              <p className="text-sm text-zinc-500">
                Show this product on the homepage.
              </p>
            </div>
          </div>

          <input
            type="checkbox"
            className="h-5 w-5 accent-zinc-900"
          />
        </div>

        {/* Status */}

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Product Status
          </label>

          <select className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white">
            <option>Draft</option>
            <option>Published</option>
            <option>Hidden</option>
          </select>
        </div>
      </div>
    </section>
  );
}