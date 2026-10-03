"use client";

import { Loader2Icon, ShoppingBag } from "lucide-react";
import OrderItem from "./OrderItem";
import useCartStore, { selectDiscount, selectShipping, selectSubtotal, selectTotal } from "@/app/store/CartStore";
import { useHydratedStore } from "@/app/hooks/useHyderatedStore";
import OrderStatus from "../orders/OrderStatus";

export default function OrderSummary({isLoading, status , session, order}) {
  const isHyderated = useHydratedStore();
  const cartItems = useCartStore(s => s.items);
  const cartSubtotal = useCartStore(selectSubtotal);
  const cartShipping = useCartStore(selectShipping);
  const cartTotal = useCartStore(selectTotal);

  const cartTotalDiscount = useCartStore(selectDiscount);
  
  
  const total = order?.total || cartTotal;
  const subtotal = order?.subtotal || cartSubtotal;
  const shipping = order?.shipping || cartShipping;
  const items = order?.orderItems || cartItems; 
  
  const totalDiscount = order ? (order.subtotal - order.total) : cartTotalDiscount;

  
  if(!isHyderated) return null;
  return (
    <div className="rounded-2xl border border-zinc-300 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}

      <div className=" gap-2 border-b border-zinc-300 p-6 pb-4 dark:border-zinc-700">
        <div className="flex items-center gap-2 mb-3">
          <ShoppingBag size={20} />
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Order Summary
          </h2>
        </div>
          
        {order && (
          <>
            <OrderStatus type={"payment"} status={order?.payment?.status || "Pending"} />
            <OrderStatus type={"delivery"} status={order?.status || "Pending"} />
          </>
        )}


      </div>
      

      {/* Products */}

      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {items.length ? (
          items.map((item,i) => (
            <OrderItem
              isCart={order ? false : true}
              key={i}
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
            <span className="flex items-baseline gap-1">Total 
              <p className="text-zinc-900 dark:text-zinc-200 font-extralight text-xs">+ No GST</p>
            </span>

            <span className="text-zinc-900 dark:text-white">
              ₹{ Math.floor(Number(total) + Number(shipping)) }
            </span>
          </div>
        </div>

        {/* Place Order */}

        {!order && (
          <button type="submit" 
            disabled={total == 0 || isLoading || status !== "authenticated"} 
            className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-black text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white disabled:opacity-50 dark:text-black">
              {(isLoading || status === "loading") ?
              <Loader2Icon className="animate-spin"/> 
              : 
              "Place Order"
              }  
          </button>  
        )}

        {order && (
          <button type="submit" 
            disabled={total == 0 || isLoading || status !== "authenticated"} 
            className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-black text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white disabled:opacity-50 dark:text-black">
              {(isLoading || status === "loading") ?
              <Loader2Icon className="animate-spin"/> 
              : 
              order?.payment?.status === "Paid" ? "Paid" : "Pay Now"
              }  
          </button>  
        )}


        <p className="mt-4 text-center text-xs text-zinc-500">
          By placing this order, you agree to our Terms & Conditions.
        </p>
      </div>
    </div>
  );
}