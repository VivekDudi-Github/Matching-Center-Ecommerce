"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import useCartStore from "@/app/store/CartStore";

export default function CartItem({ item }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div key={item.id} className="flex gap-4 border-b border-zinc-200 p-4 dark:border-zinc-800">
      <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-zinc-100">
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={item.name || 'fabrics-img'}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="font-semibold dark:text-white">
          {item.name}
        </h3>

        {item.color && (
          <p className="mt-1 text-sm text-zinc-500">
            {item.color}
          </p>
        )}

        <p className="mt-1 text-sm">
          ₹{item.price} / meter
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="0.25"
              min="0.25"
              value={item.quantity}
              onChange={(e) =>{
                updateQuantity(item.id, e.target.value)
              }}
              className="w-20 rounded-lg border border-zinc-300 bg-transparent px-2 py-1 text-center outline-none dark:border-zinc-700"
            />

            <span className="text-sm text-zinc-500">
              meter
            </span>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-red-500 transition hover:scale-110"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="font-semibold dark:text-white">
        ₹{(item.price * item.quantity).toLocaleString()}
      </div>
    </div>
  );
}