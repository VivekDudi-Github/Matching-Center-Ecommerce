"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Copy, Eye } from "lucide-react";
import OrderStatus from "../../orders/OrderStatus";
import { useState } from "react";


export default function OrderCard({ order }) {
  const [copied, setCopied] = useState(false);
  
  
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
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 title={order?.id} className="font-semibold text-zinc-300 dark:text-white truncate dark:bg-zinc-950 border border-amber-700/50 dark:hover:border-amber-200/50 bg-zinc-950 p-2 rounded-xs   group relative w-full overflow-hidden   px-4 py-2.5 text-sm tracking-wide shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-300 cursor-pointer">
            ID: {order?.id.slice(0, 8)}...
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

          <p className="mt-1 text-sm text-zinc-500">
            {order.date}
          </p>
        </div>

        <OrderStatus type={"delivery"} status={order?.status} />
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-500">Customer</span>

          <span className="font-medium text-zinc-900 dark:text-white">
            {order.customer.name}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-500">Phone</span>

          <span className="text-zinc-900 dark:text-white">
            {order.customer.number}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-zinc-500">Amount</span>

          <span className="font-semibold text-zinc-900 dark:text-white">
            ₹{order.payment.amount}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-zinc-500">Payment</span>

          <OrderStatus type={"payment"} status={order?.payment?.status} />
        </div>
      </div>

      <Link
        href={`/admin/orders/${order.id.replace("#", "")}`}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 py-3 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
      >
        <Eye size={18} />

        View Order
      </Link>
    </motion.div>
  );
}