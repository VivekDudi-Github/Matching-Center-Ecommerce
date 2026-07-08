"use client";

import { MapPin } from "lucide-react";

export default function AddressCard({ address }) {
  return (
    <div className="rounded-2xl border border-zinc-400 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <MapPin
            size={22}
            className="text-zinc-700 dark:text-zinc-300"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Shipping Address
          </h2>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Delivery location
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-50 p-4 text-sm leading-7 dark:bg-zinc-950">
        <p className="font-medium text-zinc-900 dark:text-white">
          {address.village}
        </p>

        <p className="text-zinc-600 dark:text-zinc-300">
          {address.city}, {address.state}
        </p>

        <p className="text-zinc-600 dark:text-zinc-300">
          {address.pincode}
        </p>
      </div>
    </div>
  );
}