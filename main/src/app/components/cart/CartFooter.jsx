"use client";

import Link from "next/link";
import useCartStore, {
  selectSubtotal,
  selectShipping,
  selectTotal,
  selectDiscount,
} from "@/app/store/CartStore";
import {useHydratedStore} from '@/app/hooks/useHyderatedStore';
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function CartFooter() {
  const isHyderated = useHydratedStore();

  const [collapsed, setCollapsed] = useState(true);
  
  const subtotal = useCartStore(selectSubtotal);
  const shipping = useCartStore(selectShipping);
  const total = useCartStore(selectTotal);

  const totalDiscount = useCartStore(selectDiscount);
  
  function getGstTotal(){
    return total + (total*5/100) ;
  }

  if(!isHyderated) return null;

  return (
    <div className={` sticky bottom-0 left-0 w-full  mt-1 rounded-xl p-5 pb-0 dark:border-zinc-800 duration-200 ${collapsed ? 'p-0 bg-transparent' : 'bg-zinc-300 dark:bg-zinc-900 '}`}>
      <div className={`space-y-3 text-sm duration-200 overflow-hidden ${collapsed ? 'opacity-0 scale-y-0 h-0' : '  opacity-100 '}`}> 
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
          <span className="flex items-baseline gap-1">Total 
            <p className="text-zinc-900 dark:text-zinc-200 font-extralight text-xs">+ 5% GST</p>
          </span>

          <span>₹{getGstTotal()}</span>
        </div>
      </div>

      
      <div className="flex ">
        <Link
          href="/checkout"
          className="mt-3 flex h-12 w-full items-center justify-center rounded-l-xl bg-black text-white transition hover:opacity-90 dark:bg-white dark:text-black"
        >
          Checkout
        </Link>
        <button 
          onClick={() => setCollapsed(prev => !prev)}
          className="mt-3 ml-auto h-12 text-white bg-black rounded-r-xl border-l border-white dark:border-black px-4 font-semibold transition hover:opacity-90 dark:bg-white dark:text-black">
          <ChevronDown className={collapsed ? 'rotate-180 duration-200' : ''} size={18} />
        </button>
      </div>
      
    </div>
  );
}