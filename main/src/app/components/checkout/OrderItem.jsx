"use client";

import { useHydratedStore } from "@/app/hooks/useHyderatedStore";
import useCartStore, { getCartItem, getTotalQuantity, selectColors, selectTotal } from "@/app/store/CartStore";
import { TriangleAlertIcon } from "lucide-react";
import Image from "next/image"; 


export default function OrderItem({ item : propItem  }) {
  const isHyderated = useHydratedStore(); 

  const item = useCartStore((s) => getCartItem(s,propItem.id));   

  const total = useCartStore(selectTotal);
  const totalQuantity = useCartStore(s => getTotalQuantity(s,item.id));

  if(!isHyderated) return null;
  return (
    <div className="p-5">
      <div className="flex gap-4 ">
        {/* Product Image */}

        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
          <Image
            src={item?.images?.[0]?.url}
            alt={item?.title}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        {/* Product Details */}

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <h3 className="line-clamp-2 text-base font-semibold text-zinc-900 dark:text-white">
              {item.title}  
            </h3>

            {item?.color && item.color.map((c, i) => (
                <span
                  hidden={c.quantity === 0}
                  key={i}
                  className={`inline-flex items-center mr-1 gap-1 rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-900 ring-1 ring-zinc-400 dark:bg-zinc-700 dark:text-white `}
                >
                  {c.name}
                </span>
              ))
            }

            {item.width && (
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Width: {item.width}m
              </p>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="font-medium text-zinc-900 dark:text-white">
              ₹{item.price} / meter
            </span>

            <span className="text-zinc-500 dark:text-zinc-400">
              {Number(totalQuantity).toFixed(2)} m
            </span>
          </div>
        </div>

        {/* Total */}

        <div className="flex flex-col items-end justify-between">
          <span className="text-lg font-bold text-zinc-900 dark:text-white">
            ₹{total.toLocaleString()}
          </span>

          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {Number(totalQuantity).toFixed(2)} × ₹
            {item.price.toLocaleString()}
          </span>
        </div>
      </div>
      {totalQuantity === 0 && (
        <div className=" flex text-sm text-red-600 font-medium mt-2">
          <TriangleAlertIcon className="mr-2 h-4 w-4" />
          Quantity is zero. No order will be created for this item.
        </div>
      )}
    </div>
  );
}