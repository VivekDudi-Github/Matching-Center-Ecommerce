"use client";

import { ShoppingBag } from "lucide-react";
import OrderItem from "./OrderItem";
import useCartStore, { selectDiscount, selectShipping, selectSubtotal, selectTotal } from "@/app/store/CartStore";
import { useHydratedStore } from "@/app/hooks/useHyderatedStore";

export default function OrderSummary() {
  const isHyderated = useHydratedStore();

  const items = useCartStore(s => s.items);
  console.log("items:", items);
  const subtotal = useCartStore(selectSubtotal);
  const shipping = useCartStore(selectShipping);
  const total = useCartStore(selectTotal);

  const totalDiscount = useCartStore(selectDiscount);
  
  function getGstTotal(){
    return total + (total*5/100) ;
  }

  if(!isHyderated) return null;

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
              ₹{subtotal}
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

          <div className="flex justify-between">
            <span className="text-zinc-500">Discount</span>

            <span className="font-medium dark:text-white">
              - ₹{totalDiscount}
            </span>
          </div>


          <div className="flex justify-between border-t border-dashed border-zinc-300 pt-4 text-lg font-semibold dark:border-zinc-700">
            <span className="dark:text-white">Total</span>

            <span className="text-zinc-900 dark:text-white">
              ₹{ Math.floor(getGstTotal()) + (getGstTotal() > 1 ? shipping : 0) }
            </span>
          </div>
        </div>

        {/* Place Order */}

        <button type="submit" disabled={total == 0} className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-black text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black">
          Place Order
        </button>

        <p className="mt-4 text-center text-xs text-zinc-500">
          By placing this order, you agree to our Terms & Conditions.
        </p>
      </div>
    </div>
  );
}