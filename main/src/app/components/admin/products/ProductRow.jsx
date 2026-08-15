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

      <td className="sm:px-6 sm:py-5 p-2 ">
        <div className="flex items-center gap-4">
          <div className="relative sm:size-16 size-10  overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-700">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="font-semibold truncate sm:text-sm  md:max-w-full max-w-36 text-xs md:text-md text-zinc-900 dark:text-white">
              {name}
            </h3>

            <p className="mt-1 sm:text-sm text-[10px] text-zinc-500">
              {category}
            </p>
          </div>
        </div>
      </td>
      
      {/* Category */}

      <td className="md:px-6 md:py-5 p-2 md:block hidden">
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800">
          {category}
        </span>
      </td>

      {/* Price */}

      <td className="md:px-6 md:py-5 p-2 text-[11px] sm:text-sm font-semibold text-zinc-900 dark:text-white">
        ₹{price}
      </td>

      {/* Stock */}

      <td className="md:px-6 md:py-5 p-2">
        <div className="space-y-2">
          <div className="font-medium text-[11px] sm:text-sm text-zinc-900 dark:text-white">
            {stock} m
          </div>

        </div>
      </td>

      {/* Featured */}

      <td className="md:px-6 md:py-5 p-2 text-center">
        {featured ? (
          <Star
            size={17}
            className="mx-auto fill-black text-black dark:fill-white dark:text-white"
          />
        ) : (
          <span className="text-zinc-400">—</span>
        )}
      </td>

      {/* Status */}

      <td className="md:px-6 md:py-5 p-2 text-left">
        <span
          className={`rounded-full px-3 py-1 sm:text-sm text-[10px] truncate font-semibold ${stockColor}`}
        >
          {stockLabel}
        </span>
      </td>

      {/* Actions */}

      <td className="md:px-6 md:py-5 p-2">
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
