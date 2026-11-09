"use client";

import Image from "next/image";
import Link from "next/link";
import ColorCards from "./ColorCards";

export default function ProductsCard({ products, payment ,order}) {
  return (
    <div className="rounded-2xl border border-zinc-400 bg-white lg:p-6 p-2 py-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="mb-6 md:text-lg text-base font-semibold text-zinc-900 dark:text-white">
        Ordered Products
      </h2>

      <div className="space-y-5">
        {products.map((product) => {
          const totalQuantity = product.color.reduce((acc,curr) => acc + curr.quantity , 0)
       
          return (
            <Link
              href={`/products/${product.productId}`}
              key={product.id}
              className="flex items-center text-xs gap-4 border-b border-zinc-200 pb-3 dark:border-zinc-800"
            >
              <div className="relative size-17.5 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
                {product?.imageId ? 
                  <Image
                    src={product?.image.url}
                    alt={product?.title}
                    fill
                    className="object-cover"
                  /> : null}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold md:text-lg text-sm text-zinc-900 dark:text-white">
                  {product?.title}
                  
                </h3>
                <div className="flex gap-2 items-center justify-start text-zinc-500">
                  Colors: 
                  <ColorCards colors={product.color} />
                </div>

                <p className="mt-1 text-xs text-zinc-500">
                  ₹{product?.price} /m
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  Quantity : {totalQuantity}/m
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-sm md:text-base text-zinc-900 dark:text-white">
                  ₹{product?.price * totalQuantity}
                </p>
              </div>
            </Link>
        )})}
      </div>

      <div className=" border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <div className="flex items-center justify-between text-xl font-bold text-zinc-900 dark:text-white">
          <span>Total + Shipping</span>

          <span>₹{order.total} + {order.shipping}</span>
        </div>
      </div>
    </div>
  );
}