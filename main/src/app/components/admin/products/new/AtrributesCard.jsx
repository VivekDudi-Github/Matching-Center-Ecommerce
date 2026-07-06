"use client";

import { Shirt } from "lucide-react";

export default function AttributesCard() {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}

      <div className="flex items-center gap-3 border-b border-zinc-200 p-6 dark:border-zinc-800">
        <div className="rounded-xl bg-zinc-100 p-2 dark:bg-zinc-800">
          <Shirt className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Fabric Attributes
          </h2>

          <p className="text-sm text-zinc-500">
            Technical information about the fabric.
          </p>
        </div>
      </div>

      {/* Body */}

      <div className="space-y-6 p-6">
        <div className="grid gap-5 md:grid-cols-2">
          {/* Material */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Material
            </label>

            <select className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white">
              <option>Cotton</option>
              <option>Silk</option>
              <option>Linen</option>
              <option>Rayon</option>
              <option>Polyester</option>
              <option>Denim</option>
            </select>
          </div>

          {/* Pattern */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Pattern
            </label>

            <input
              type="text"
              placeholder="Printed / Solid / Floral"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          {/* Width */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Width (Inches)
            </label>

            <input
              type="number"
              placeholder="44"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          {/* GSM */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              GSM
            </label>

            <input
              type="number"
              placeholder="180"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          {/* Color */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Available Colors
            </label>

            <input
              type="text"
              placeholder="Red, Blue, Green..."
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          {/* Wash Care */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Wash Care
            </label>

            <input
              type="text"
              placeholder="Machine Wash"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}