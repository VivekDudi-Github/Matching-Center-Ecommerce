"use client";

import { CreditCard } from "lucide-react";

const paymentColors = {
  Paid:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",

  COD:
    "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400",

  Failed:
    "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

export default function PaymentCard({ payment }) {
  return (
    <div className="rounded-2xl border border-zinc-400 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <CreditCard
            size={22}
            className="text-zinc-700 dark:text-zinc-300"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Payment
          </h2>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Payment details
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex justify-between">
          <span className="text-zinc-500">Method</span>

          <span className="font-medium text-zinc-900 dark:text-white">
            {payment.method}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-zinc-500">Status</span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              paymentColors[payment.status]
            }`}
          >
            {payment.status}
          </span>
        </div>

        <div className="flex justify-between border-t border-zinc-200 pt-5 dark:border-zinc-800">
          <span className="text-zinc-500">Amount</span>

          <span className="text-lg font-semibold text-zinc-900 dark:text-white">
            ₹{payment.amount}
          </span>
        </div>
      </div>
    </div>
  );
}