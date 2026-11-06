"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check,  Copy, Eye } from "lucide-react";
import OrderStatus from "../../orders/OrderStatus";
import { useState } from "react";
import {format} from "date-fns";


export default function OrderRow({ order }) {
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

  const date = format(order.payment.updatedAt,'LLLL d, yyyy');
  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{
        backgroundColor: "rgba(0,0,0,0.02)",
      }}
      className="border-b border-zinc-400 dark:border-zinc-700 md:text-base text-xs"
    >
      {/* Order */}

      <td className="px-2 py-2 font-semibold text-zinc-900 dark:text-white ">
        <h3 title={order?.id} className="font-semibold text-zinc-300 dark:text-white truncate dark:bg-zinc-950 border border-amber-700/50 dark:hover:border-amber-200/50 bg-zinc-950 p-2 rounded-xs   group relative w-full overflow-hidden   px-4 py-2.5 text-sm tracking-wide shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-300 cursor-pointer">
          ID: {order?.id.slice(0, 5)}...
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
      </td>

      {/* Customer */}

      <td className="px-3 py-3">
        <div>
          <p className="font-medium text-zinc-900 dark:text-white">
            {order?.customer.name}
          </p>

          <p className="text-sm text-zinc-500">
            {order?.customer?.number}
          </p>
        </div>
      </td>

      {/* Amount */}

      <td className="px-3 py-3 font-semibold text-zinc-900 dark:text-white">
        ₹{ Math.floor(order?.payment?.amount) }
      </td>

      {/* Payment */}

      <td className="px-3 py-3">
        <OrderStatus type={"payment"} status={order?.payment?.status} />
      </td>

      {/* Status */}

      <td className="px-3 py-3 text-center">
        <OrderStatus type={"delivery"} status={order?.status} />
      </td>

      {/* Date */}

      <td className="px-3 py-3 text-zinc-600 dark:text-zinc-300">
        {date}
      </td>

      {/* Action */}

      <td className="px-3 py-3">
        <div className="flex justify-end">
          <Link
            href={`/admin/orders/${order.id.replace("#", "")}`}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <Eye size={16} />

            View
          </Link>
        </div>
      </td>
    </motion.tr>
  );
}