"use client";

import { useState } from "react";
import { Truck } from "lucide-react";

const statuses = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function StatusCard({ status }) {
  const [currentStatus, setCurrentStatus] = useState(status);

  return (
    <div className="rounded-2xl border border-zinc-400 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <Truck
            size={22}
            className="text-zinc-700 dark:text-zinc-300"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Order Status
          </h2>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Update order status
          </p>
        </div>
      </div>

      <select
        value={currentStatus}
        onChange={(e) => setCurrentStatus(e.target.value)}
        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
      >
        {statuses.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      <button className="mt-5 w-full rounded-xl bg-zinc-900 py-3 font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900">
        Save Status
      </button>
    </div>
  );
}