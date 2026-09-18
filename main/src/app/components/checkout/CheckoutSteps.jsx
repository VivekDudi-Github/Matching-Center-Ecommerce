"use client";

import { ShoppingCart, CreditCard, CircleCheckBig } from "lucide-react";

export default function CheckoutSteps({currentStep}) {
  return (
    <div className="mb-8 rounded-2xl border border-zinc-200 bg-white p-3 sm:p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        {/* Cart */}

        <div className="flex flex-col items-center">
          <div className="flex sm:size-11 size-7 p-1.5 items-center justify-center rounded-full bg-green-600 text-white">
            <ShoppingCart />
          </div>

          <span className="mt-2 sm:text-sm text-xs font-medium text-zinc-900 dark:text-white">
            Cart
          </span>
        </div>

        {/* Line */}

        <div className="mx-3 h-0.5 flex-1 bg-green-600" />

        {/* Checkout */}

        <div className="flex flex-col items-center">
          <div className="flex sm:size-11 size-6 p-1 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
            <CreditCard  />
          </div>

          <span className="mt-2 sm:text-sm text-xs font-semibold text-zinc-900 dark:text-white">
            Checkout
          </span>
        </div>

        {/* Line */}

        <div className="mx-3 h-0.5 flex-1 bg-zinc-300 dark:bg-zinc-700" />

        {/* Confirmation */}

        <div className="flex flex-col items-center">
          <div className="flex sm:size-11 size-6 items-center p-1 justify-center rounded-full border border-zinc-300 text-zinc-400 dark:border-zinc-700">
            <CircleCheckBig  />
          </div>

          <span className="mt-2 sm:text-sm text-xs text-zinc-500">
            Confirm
          </span>
        </div>
      </div>
    </div>
  );
}