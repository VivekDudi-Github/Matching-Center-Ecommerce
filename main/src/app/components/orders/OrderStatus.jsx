"use client";

import {
  CheckCircle2,
  Clock3,
  CreditCard,
  Package,
  RotateCcw,
  Truck,
  XCircle,
} from "lucide-react";


const paymentConfig = {
  Pending: {
    label: "Payment Pending",
    icon: Clock3,
    className:
      "border-amber-900 bg-amber-900 text-amber-200 dark:border-amber-400/50 dark:bg-amber-950/30 dark:text-amber-400",
  },

  Paid: {
    label: "Payment Paid",
    icon: CheckCircle2,
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400",
  },

  Failed: {
    label: "Payment Failed",
    icon: XCircle,
    className:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400",
  },

  Refunded: {
    label: "Payment Refunded",
    icon: RotateCcw,
    className:
      "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/50 dark:bg-purple-950/30 dark:text-purple-400",
  },
};

const deliveryConfig = {
  Pending: {
    label: "Delivery Pending",
    icon: Clock3,
    className:
      "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400",
  },

  Confirmed: {
    label: "Order Confirmed",
    icon: CheckCircle2,
    className:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-400",
  },

  Packed: {
    label: "Packed",
    icon: Package,
    className:
      "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/30 dark:text-indigo-400",
  },

  Shipped: {
    label: "Shipped",
    icon: Truck,
    className:
      "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900/50 dark:bg-cyan-950/30 dark:text-cyan-400",
  },

  Delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400",
  },

  Cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400",
  },

  Expired: {
    label: "Expired",
    icon: XCircle,
    className:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400",
  }
};

export default function OrderStatus({ type, status }) {
  const config = 
    type === "payment"
      ? paymentConfig[status]
      : deliveryConfig[status];

  if (!config) {
    return null;
  }

  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium ${config.className}`}
    >
      <Icon size={14} strokeWidth={2} />

      <span>{config.label}</span>
    </div>
  );
}