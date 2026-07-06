"use client";

import { FileText } from "lucide-react";

export default function DescriptionCard() {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}

      <div className="flex items-center gap-3 border-b border-zinc-200 p-6 dark:border-zinc-800">
        <div className="rounded-xl bg-zinc-100 p-2 dark:bg-zinc-800">
          <FileText className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Product Description
          </h2>

          <p className="text-sm text-zinc-500">
            Information displayed on the product page.
          </p>
        </div>
      </div>

      {/* Body */}

      <div className="space-y-6 p-6">
        {/* Short Description */}

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Short Description
          </label>

          <textarea
            rows={3}
            placeholder="A brief summary shown in listings and previews..."
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition resize-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>

        {/* Full Description */}

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Detailed Description
          </label>

          <textarea
            rows={8}
            placeholder="Write a detailed description about the fabric, texture, usage, quality, care instructions..."
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition resize-y focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>

        {/* Fabric Care */}

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Care Instructions
          </label>

          <textarea
            rows={4}
            placeholder="Machine wash cold, do not bleach..."
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition resize-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>
      </div>
    </section>
  );
}