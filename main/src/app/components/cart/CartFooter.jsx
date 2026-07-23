"use client";

import Link from "next/link";
import useCartStore, {
  selectSubtotal,
  selectShipping,
  selectTotal,
} from "@/app/store/CartStore";
import {useHydratedStore} from '@/app/hooks/useHyderatedStore';

export default function CartFooter() {
  const isHyderated = useHydratedStore();

  const subtotal = useCartStore(selectSubtotal);
  const shipping = useCartStore(selectShipping);
  const total = useCartStore(selectTotal);

  const totalDiscount = 0;
  // const subtotal = 100;
  // const shipping = 0;
  // const total = 100;
  
  if(!isHyderated) return null;

  return (
    <div className="border-t border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>

          <span>₹{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>

          <span>
            {shipping === 0 ? "FREE" : `₹${shipping}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>

          <span>
            ₹{totalDiscount.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between border-t border-dashed border-zinc-300 pt-3 text-lg font-semibold dark:border-zinc-700">
          <span>Total</span>

          <span>₹{total.toLocaleString()}</span>
        </div>
      </div>

      <Link
        href="/checkout"
        className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-black text-white transition hover:opacity-90 dark:bg-white dark:text-black"
      >
        Checkout
      </Link>
    </div>
  );
}