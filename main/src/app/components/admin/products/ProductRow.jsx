"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Eye,
  Pencil,
  Trash2,
  Star,
} from "lucide-react";
import ActionMenu from "./ActionMenu";

export default function ProductRow({ product }) {
  const {
    image,
    name,
    category,
    price,
    stock,
    featured,
  } = product;

  const stockColor =
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
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{
        backgroundColor: "rgba(0,0,0,0.02)",
      }}
      className="border-b border-zinc-100 dark:border-zinc-800"
    >
      {/* Product */}

      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white">
              {name}
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              {category}
            </p>
          </div>
        </div>
      </td>
      
      {/* Category */}

      <td className="px-6 py-5">
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800">
          {category}
        </span>
      </td>

      {/* Price */}

      <td className="px-6 py-5 font-semibold text-zinc-900 dark:text-white">
        ₹{price}
      </td>

      {/* Stock */}

      <td className="px-6 py-5">
        <div className="space-y-2">
          <div className="font-medium text-zinc-900 dark:text-white">
            {stock} m
          </div>

        </div>
      </td>

      {/* Featured */}

      <td className="px-6 py-5 text-center">
        {featured ? (
          <Star
            size={20}
            className="mx-auto fill-black text-black dark:fill-white dark:text-white"
          />
        ) : (
          <span className="text-zinc-400">—</span>
        )}
      </td>

      {/* Status */}

      <td className="px-6 py-5 text-center">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${stockColor}`}
        >
          {stockLabel}
        </span>
      </td>

      {/* Actions */}

      {/* <td className="px-6 py-5">
        <div className="flex justify-end gap-2">
          <button className="rounded-lg p-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <Eye
              size={18}
              className="text-zinc-600 dark:text-zinc-300"
            />
          </button>

          <button className="rounded-lg p-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <Pencil
              size={18}
              className="text-blue-600"
            />
          </button>

          <button className="rounded-lg p-2 transition hover:bg-red-100 dark:hover:bg-red-500/15">
            <Trash2
              size={18}
              className="text-red-500"
            />
          </button>
        </div>
      </td> */}
      <td className="px-6 py-5">
        <ActionMenu
          viewHref={`/admin/products/${product.id}`}
          editHref={`/admin/products/${product.id}/edit`}
          onDuplicate={() => console.log("duplicate")}
          onDelete={() => console.log("delete")}
        />
      </td>

    </motion.tr>
  );
}
