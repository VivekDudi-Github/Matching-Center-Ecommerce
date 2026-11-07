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
        {products.map((product) => {
          const totalQuantity = product.color.reduce((acc,curr) => acc + curr.quantity , 0)
       
          return (
            <Link
              href={`/shop/${product.id}`}
              key={product.id}
              className="flex items-center gap-4 border-b border-zinc-200 pb-5 dark:border-zinc-800"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
                {product?.imageId ? 
                  <Image
                    src={product?.image.url}
                    alt={product?.title}
                    fill
                    className="object-cover"
                  /> : null}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-zinc-900 dark:text-white">
                  {product?.title}
                  
                </h3>
                <div className="flex gap-2 items-center justify-start text-zinc-500">
                  Colors: 
                  {product?.color?.map((c) => (
                    <div key={c?.colorId} className={`size-3 rounded-full`} style={{background: c.hex}}></div>
                  ))}
                </div>

                <p className="mt-1 text-sm text-zinc-500">
                  ₹{product?.price} /m
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  Quantity : {totalQuantity}/m
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-zinc-900 dark:text-white">
                  ₹{product?.price * totalQuantity}
                </p>
              </div>
            </Link>
        )})}
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