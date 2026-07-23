"use client";

import { ShoppingCart, CreditCard, CircleCheckBig } from "lucide-react";

export default function CheckoutSteps({currentStep}) {
  return (
    <div className="mb-8 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        {/* Cart */}

        <div className="flex flex-col items-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white">
            <ShoppingCart size={20} />
          </div>

          <span className="mt-2 text-sm font-medium text-zinc-900 dark:text-white">
            Cart
          </span>
        </div>

        {/* Line */}

        <div className="mx-3 h-[2px] flex-1 bg-green-600" />

        {/* Checkout */}

        <div className="flex flex-col items-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
            <CreditCard size={20} />
          </div>

          <span className="mt-2 text-sm font-semibold text-zinc-900 dark:text-white">
            Checkout
          </span>
        </div>

        {/* Line */}

        <div className="mx-3 h-[2px] flex-1 bg-zinc-300 dark:bg-zinc-700" />

        {/* Confirmation */}

        <div className="flex flex-col items-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-300 text-zinc-400 dark:border-zinc-700">
            <CircleCheckBig size={20} />
          </div>

          <span className="mt-2 text-sm text-zinc-500">
            Confirmation
          </span>
        </div>
      </div>
    </div>
  );
}