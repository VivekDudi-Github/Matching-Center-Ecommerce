"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Eye,
  Pencil,
  Trash2,
  Star,
} from "lucide-react";

export default function ProductCard({ product }) {
  const {
    image,
    name,
    category,
    price,
    stock,
    featured,
  } = product;

  const stockBadge =
    stock <= 0
      ? "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
      : stock <= 20
      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400"
      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400";

  const stockLabel =
    stock <= 0
      ? "Out of Stock"
      : stock <= 20
      ? "Low Stock"
      : "In Stock";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      {/* Image */}

      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />

        {featured && (
          <div className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow dark:bg-zinc-900/90">
            <Star
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />
          </div>
        )}
      </div>

      {/* Content */}

      <div className="space-y-5 p-5">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            {name}
          </h2>

          <span className="mt-2 inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium dark:bg-zinc-800">
            {category}
          </span>
        </div>

        {/* Price & Stock */}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Price
            </p>

            <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
              ₹{price}
              <span className="text-sm font-normal text-zinc-500">
                {" "}
                / meter
              </span>
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Stock
            </p>

            <p className="mt-1 font-semibold text-zinc-900 dark:text-white">
              {stock} m
            </p>
          </div>
        </div>

        {/* Status */}

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${stockBadge}`}
        >
          {stockLabel}
        </span>

        {/* Actions */}

        <div className="flex gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-300 py-2.5 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
            <Eye size={18} />
            View
          </button>

          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-200 py-2.5 text-blue-600 transition hover:bg-blue-50 dark:border-blue-500/30 dark:hover:bg-blue-500/10">
            <Pencil size={18} />
            Edit
          </button>

          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 text-red-500 transition hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10">
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}