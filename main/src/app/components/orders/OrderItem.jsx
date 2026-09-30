"use client";

import Image from "next/image";
import { ArrowUpLeft, ArrowUpRightFromSquareIcon, LoaderPinwheelIcon, LucideFileChartColumnIncreasing,LucideLoaderPinwheel, Palette, Ruler, Shirt } from "lucide-react";
import Link from "next/link";
import ColorPalette from "./ColorPalette";

export default function OrderItem({ item }) {
  const totalQuantity = item.color.reduce((acc, color) => 
    acc + color.quantity, 0);

  return (
    <div className="p-4 sm:p-5">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 sm:h-24 sm:w-24">
          {item.image ? (
            <Image
              src={item.image.url}
              alt={item.title}
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
            <div className="flex gap-2 sm:justify-start justify-between mb-2">
              <div className="min-w-0">
                <h4 className="truncate font-medium text-zinc-900 dark:text-white sm:text-base">
                  {item.title}
                </h4>
                <div className="flex gap-1">
                  <div className=" flex items-center gap-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    <Shirt size={14} />
                    <p>{item.categoryName}</p>
                  </div>
                  <div className=" flex items-center gap-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    <LoaderPinwheelIcon size={14} />
                    <p>{item.pattern}</p>
                  </div>
                </div>
              </div>
              <Link
              href={"/products/"+item.productId}
              className="flex items-start cursor-pointer">
                <ArrowUpRightFromSquareIcon size={25} className=" text-amber-400 dark:text-amber-300" />
              </Link>
            </div>

            {/* Price */}
            <div className="shrink-0 text-left sm:text-right">
                <p className="font-semibold text-zinc-900 dark:text-white">
                  ₹{Number(item.price) * Number(totalQuantity)}
                </p>

              <span className="sm:text-sm text-xs text-zinc-500 dark:text-zinc-500">
                 ₹{item.price} × {totalQuantity}m
              </span>
            </div>
          </div>

          {/* Colors */}
          {item.color?.length > 0 && (
            <div className="mt-4">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <Palette size={14} />
                <span>Purchased colors</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.color.map((color, index) => (
                  <ColorPalette color={color} key={color.colorId} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}