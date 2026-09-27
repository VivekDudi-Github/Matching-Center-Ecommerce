"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Package,
  Receipt,
} from "lucide-react";
import { useState } from "react";

import OrderItem from "./OrderItem";
import OrderStatus from "./OrderStatus";

export default function OrderCard({ order }) {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const itemCount = order?.orderItems?.length || 0;
  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true 
  };

  const date = new Date(order.createdAt).toLocaleString("en-IN", dateOptions);


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(order.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy ID: ", err);
    }
  };
  return (
    <motion.article
      layout
      className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-md shadow-zinc-400/50 dark:shadow-none dark:border-zinc-800 dark:bg-zinc-950"
    >
      {/* Order Header */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Order information */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
   
              <div className="flex items-center gap-2 min-w-0 max-w-full">
                <h3 title={order?.id} className="font-semibold text-zinc-300 dark:text-white truncate dark:bg-zinc-950 border border-amber-700 dark:hover:border-amber-200/50 bg-zinc-950 p-2 rounded-xs   group relative w-full overflow-hidden   px-4 py-2.5 text-sm tracking-wide shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-300 cursor-pointer">
                  Order ID: {order?.id.slice(0, 10)}...
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="shrink-0  pl-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded transition-colors"
                    title="Copy Order ID"
                  >
                    {copied ? (
                      <Check size={14} className="text-emerald-500" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>

                </h3>
              </div>

              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <CalendarDays size={15} />
                <span>{date} </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Receipt size={15} />
                <span>₹{order.total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Statuses */}
          <div className="flex flex-wrap items-center gap-2">
            
            {(!order?.payment?.status || order?.payment?.status === "Pending")  ?
            <button
              className={` group relative w-full overflow-hidden border border-zinc-700/80 bg-zinc-950  px-4 py-2.5 text-sm font-medium tracking-wide text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-300  hover:border-amber-700  dark:hover:border-amber-200/50 hover:shadow-[0_6px_28px_rgba(0,0,0,0.35)]  active:translate-y-px  cursor-pointer`}
            >
              <span
                className={` absolute inset-0 -translate-x-full  bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full `}
              />

              <span className="relative flex items-center justify-center gap-2">
                Pay Now
                <span className="text-[10px] text-amber-200/80 transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </button>
            :
            <OrderStatus
              type="payment"
              status={order?.payment?.status || "Pending"}
            />}

            {order?.payment?.status === "Paid" && <OrderStatus
              type="delivery"
              status={order.deliveryStatus || "Pending"}
            />}
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="border-t border-zinc-300 dark:border-zinc-700">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/60 sm:px-5"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <Package size={16} />

            <span>
              Order items
              <span className="ml-1 text-zinc-400 dark:text-zinc-500">
                ({itemCount})
              </span>
            </span>
          </div>

          {isOpen ? (
            <ChevronUp
              size={18}
              className="text-zinc-400"
            />
          ) : (
            <ChevronDown
              size={18}
              className="text-zinc-400"
            />
          )}
        </button>

        
          <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
            className="divide-y divide-zinc-100 dark:divide-zinc-800 overflow-hidden"
          >
            {order.orderItems?.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
              />
            ))}
          </motion.div>
        
      </div>

      {/* Order Total */}
      <div className="border-t border-zinc-400 bg-zinc-50/70 px-4 py-4 dark:border-zinc-700 dark:bg-zinc-900/40 sm:px-5">
        <div className="ml-auto w-full space-y-2 sm:max-w-xs">
          <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
            <span>Subtotal</span>
            <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
          </div>

          <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
            <span>Shipping</span>
            <span>
              {order.shipping === 0
                ? "Free"
                : `₹${order.shipping.toLocaleString("en-IN")}`}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-zinc-200 pt-2 dark:border-zinc-700">
            <span className="font-semibold text-zinc-900 dark:text-white">
              Total
            </span>

            <span className="text-lg font-semibold text-zinc-900 dark:text-white">
              ₹{order.total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}