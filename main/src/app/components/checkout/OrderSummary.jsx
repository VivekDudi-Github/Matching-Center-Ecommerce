"use client";

import { ShoppingBag } from "lucide-react";
import OrderItem from "./OrderItem";

export default function OrderSummary({
  items = [],
  subtotal = 0,
  shipping = 0,
  total = 0,
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}

      <div className="flex items-center gap-2 border-b border-zinc-200 p-6 dark:border-zinc-800">
        <ShoppingBag size={20} />

        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
          Order Summary
        </h2>
      </div>

      {/* Products */}

      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {items.length ? (
          items.map((item) => (
            <OrderItem
              key={item.id}
              item={item}
            />
          ))
        ) : (
          <div className="p-8 text-center text-zinc-500 dark:text-zinc-400">
            Your cart is empty.
          </div>
        )}
      </div>

      {/* Price Details */}

      <div className="border-t border-zinc-200 p-6 dark:border-zinc-800">
        <h3 className="mb-4 font-semibold text-zinc-900 dark:text-white">
          Price Details
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">Subtotal</span>

            <span className="font-medium dark:text-white">
              ₹{subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-500">Shipping</span>

            {shipping === 0 ? (
              <span className="font-medium text-green-600">
                FREE
              </span>
            ) : (
              <span className="font-medium dark:text-white">
                ₹{shipping}
              </span>
            )}
          </div>

          <div className="flex justify-between border-t border-dashed border-zinc-300 pt-4 text-lg font-semibold dark:border-zinc-700">
            <span className="dark:text-white">Total</span>

            <span className="text-zinc-900 dark:text-white">
              ₹{total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Place Order */}

        <button className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-black text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black">
          Place Order
        </button>

        <p className="mt-4 text-center text-xs text-zinc-500">
          By placing this order, you agree to our Terms & Conditions.
        </p>
      </div>
    </div>
  );
}