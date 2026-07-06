"use client";

import { Save, Eye, Trash2 } from "lucide-react";

export default function PublishCard() {
  return (
    <section className="sticky bottom-4 rounded-2xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col gap-6 p-6">
        {/* Summary */}

        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Ready to Publish?
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Review your product information before saving it to the catalogue.
          </p>
        </div>

        {/* Status */}

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm text-zinc-500">
              Status
            </p>

            <p className="mt-2 font-semibold text-amber-600">
              Draft
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm text-zinc-500">
              Visibility
            </p>

            <p className="mt-2 font-semibold text-zinc-900 dark:text-white">
              Public
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm text-zinc-500">
              Images
            </p>

            <p className="mt-2 font-semibold text-zinc-900 dark:text-white">
              0 Uploaded
            </p>
          </div>
        </div>

        {/* Buttons */}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-300 px-5 py-3 font-medium text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-500/10"
          >
            <Trash2 size={18} />
            Delete
          </button>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 px-5 py-3 font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <Eye size={18} />
            Preview
          </button>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <Save size={18} />
            Save Product
          </button>
        </div>
      </div>
    </section>
  );
}