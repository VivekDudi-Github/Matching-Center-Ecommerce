"use client";

import { User, Phone } from "lucide-react";

export default function CustomerCard({ customer }) {
  return (
    <div className="rounded-2xl border border-zinc-400 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}

      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <User
            size={22}
            className="text-zinc-700 dark:text-zinc-300"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Customer
          </h2>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Customer information
          </p>
        </div>
      </div>

      {/* Details */}

      <div className="space-y-5">
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Name
          </p>

          <p className="mt-1 font-medium text-zinc-900 dark:text-white">
            {customer.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Phone
          </p>

          <div className="mt-2 flex items-center justify-between gap-4">
            <p className="font-medium text-zinc-900 dark:text-white">
              {customer.phone}
            </p>

            <a
              href={`tel:${customer.phone}`}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <Phone size={16} />
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}