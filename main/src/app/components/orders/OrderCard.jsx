"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Package,
  Receipt,
} from "lucide-react";
import { useState } from "react";

import OrderItem from "./OrderItem";
import OrderStatus from "./OrderStatus";

export default function OrderCard({ order }) {
  const [isOpen, setIsOpen] = useState(true);

  const itemCount = order?.orderItems?.length || 0;

  return (
    <motion.article
      layout
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-500 dark:shadow-none dark:border-zinc-800 dark:bg-zinc-950"
    >
      {/* Order Header */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          {/* Order information */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                {order.id}
              </h3>

              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1.5">
                <CalendarDays size={15} />
                <span>{order.createdAt}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Receipt size={15} />
                <span>₹{order.total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Statuses */}
          <div className="flex flex-wrap items-center gap-2">
            <OrderStatus
              type="payment"
              status={order.paymentStatus}
            />

            <OrderStatus
              type="delivery"
              status={order.deliveryStatus}
            />
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

        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="divide-y divide-zinc-100 dark:divide-zinc-800"
          >
            {order.orderItems?.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
              />
            ))}
          </motion.div>
        )}
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