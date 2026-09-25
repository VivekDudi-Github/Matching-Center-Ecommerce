"use client";

import Image from "next/image";
import { Palette, Ruler } from "lucide-react";

export default function OrderItem({ item }) {
  return (
    <div className="p-4 sm:p-5">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 sm:h-24 sm:w-24">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
              No image
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h4 className="truncate font-medium text-zinc-900 dark:text-white sm:text-base">
                {item.name}
              </h4>

              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {item.category}
              </p>
            </div>

            {/* Price */}
            <div className="shrink-0 text-left sm:text-right">
              <p className="font-semibold text-zinc-900 dark:text-white">
                ₹{item.price.toLocaleString("en-IN")}
              </p>

              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                per meter
              </p>
            </div>
          </div>

          {/* Colors */}
          {item.colors?.length > 0 && (
            <div className="mt-4">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <Palette size={14} />
                <span>Purchased colors</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.colors.map((color, index) => (
                  <div
                    key={`${color.name}-${index}`}
                    className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
                  >
                    {/* Color */}
                    <span
                      className="h-4 w-4 shrink-0 rounded-full border border-zinc-300 dark:border-zinc-600"
                      style={{
                        backgroundColor: color.hex || "#e4e4e7",
                      }}
                    />

                    {/* Color name */}
                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      {color.name}
                    </span>

                    {/* Ordered meters */}
                    <span className="flex items-center gap-1 border-l border-zinc-200 pl-2 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                      <Ruler size={12} />
                      {Number(color.meters).toFixed(2)} m
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}