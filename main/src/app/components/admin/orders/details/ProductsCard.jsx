"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductsCard({ products, payment }) {
  return (
    <div className="rounded-2xl border border-zinc-400 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-white">
        Ordered Products
      </h2>

      <div className="space-y-5">
        {products.map((product) => (
          <Link
            href={`/shop/${product.id}`}
            key={product.id}
            className="flex items-center gap-4 border-b border-zinc-200 pb-5 dark:border-zinc-800"
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                {product.name}
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                ₹{product.price} / {product.unit}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                Quantity : {product.quantity} {product.unit}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-zinc-900 dark:text-white">
                ₹{product.price * product.quantity}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <div className="flex items-center justify-between text-xl font-bold text-zinc-900 dark:text-white">
          <span>Total</span>

          <span>₹{payment.amount}</span>
        </div>
      </div>
    </div>
  );
}