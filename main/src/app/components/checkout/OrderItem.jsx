"use client";

import Image from "next/image";

export default function OrderItem({ item }) {
  const total = item.price * item.quantity;

  return (
    <div className="flex gap-4 p-5">
      {/* Product Image */}

      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      {/* Product Details */}

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <h3 className="line-clamp-2 text-base font-semibold text-zinc-900 dark:text-white">
            {item.name}
          </h3>

          {item.color && (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Color: {item.color}
            </p>
          )}

          {item.width && (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Width: {item.width}
            </p>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="font-medium text-zinc-900 dark:text-white">
            ₹{item.price.toLocaleString()} / meter
          </span>

          <span className="text-zinc-500 dark:text-zinc-400">
            {Number(item.quantity).toFixed(2)} m
          </span>
        </div>
      </div>

      {/* Total */}

      <div className="flex flex-col items-end justify-between">
        <span className="text-lg font-bold text-zinc-900 dark:text-white">
          ₹{total.toLocaleString()}
        </span>

        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {Number(item.quantity).toFixed(2)} × ₹
          {item.price.toLocaleString()}
        </span>
      </div>
    </div>
  );
}