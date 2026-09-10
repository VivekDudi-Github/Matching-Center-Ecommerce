"use client";
import { useState } from "react";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import useCartStore from "@/app/store/CartStore";
import { motion, AnimatePresence } from "framer-motion";


// export default function CartItem({ item }) {
//   const updateQuantity = useCartStore((s) => s.updateQuantity);
//   const removeItem = useCartStore((s) => s.removeItem); 
  
//   // return (
//   //   <div key={item.id} className="flex gap-4 border-b border-zinc-200 shadow shadow-black flex-wrap p-4 dark:border-zinc-800 duration-200">
//   //     <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-zinc-100">
//   //       {item?.images?.[0]?.url && (
//   //         <Image
//   //           src={item?.images[0]?.url || '/fabrics_1.webp'}
//   //           alt={item?.name || 'fabrics-img'}
//   //           fill
//   //           className="object-cover"
//   //         />
//   //       )}
//   //     </div>
        
//   //     <div className="flex flex-1 flex-col">
//   //       <h3 className="font-semibold truncate dark:text-white">
//   //         {item?.title}
//   //       </h3>

//   //       {item.color && (
//   //         <p className="mt-1 text-sm truncate text-zinc-500">
//   //           {Array.isArray(item.color) ? item.color.map(i => i.name.toUpperCase() + ', ') : item.color.toUpperCase()}
//   //         </p>
//   //       )}

//   //       <p className="mt-1 text-sm">
//   //         ₹{item.price} / meter
//   //       </p>

//   //       <div className="mt-4 flex items-center justify-between">
//   //         <div className="flex items-center gap-2">
//   //           <input
//   //             type="number"
//   //             step="0.25"
//   //             min="0.25"
//   //             value={item.quantity}
//   //             onChange={(e) =>{
//   //               updateQuantity(item.id, e.target.value)
//   //             }}
//   //             className="w-20 rounded-lg border border-zinc-300 bg-transparent px-2 py-1 text-center outline-none dark:border-zinc-700"
//   //           />

//   //           <span className="text-sm text-zinc-500">
//   //             meter
//   //           </span>
//   //         </div>

//   //         <button
//   //           onClick={() => removeItem(item.id)}
//   //           className="text-red-500 transition hover:scale-110"
//   //         >
//   //           <Trash2 size={18} />
//   //         </button>
//   //       </div>
//   //     </div>

//   //     <div className="font-semibold dark:text-white">
//   //       ₹{(item.price * item.quantity).toLocaleString()}
//   //     </div>
//   //   </div>
//   // );
// }


export default function CartItem({ item }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const colors = Array.isArray(item?.color) ? item.color : [];

  const [selectedColorId, setSelectedColorId] = useState(() => {
    const selected = colors.find(
      (color) => Number(color.quantity || 0) > 0
    );

    return selected?.id ?? colors[0]?.id ?? null;
  });

  const selectedColor = colors.find(
    (color) => color.id === selectedColorId
  );

  const activeColors = colors.filter(
    (color) => Number(color.quantity || 0) > 0
  );

  const totalQuantity = activeColors.reduce(
    (total, color) => total + Number(color.quantity || 0),
    0
  );

  const totalPrice =
    totalQuantity * Number(item?.price || 0);

  const formatQuantity = (value) => {
    const number = Number(value || 0);

    return number
      .toFixed(2)
      .replace(/\.00$/, "")
      .replace(/(\.\d)0$/, "$1");
  };

  const updateColorQuantity = (color, nextQuantity) => {
    const available = Number(color?.availableMeters || 0);

    let quantity = Number(nextQuantity);

    if (Number.isNaN(quantity)) return;

    // Keep quantities in 0.25m increments.
    quantity = Math.round(quantity * 4) / 4;

    quantity = Math.max(0, quantity);

    if (available > 0) {
      quantity = Math.min(quantity, available);
    }

    updateQuantity(item.id, color.id, quantity);
  };

  const decreaseQuantity = () => {
    if (!selectedColor) return;

    updateColorQuantity(
      selectedColor,
      Number(selectedColor.quantity || 0) - 0.25
    );
  };

  const increaseQuantity = () => {
    if (!selectedColor) return;

    updateColorQuantity(
      selectedColor,
      Number(selectedColor.quantity || 0) + 0.25
    );
  };

  return (
    <motion.article
      layout
      className="border-b border-zinc-200 py-4 last:border-b-0 dark:border-zinc-800"
    >
      {/* ------------------------------------------------
          PRODUCT HEADER
      ------------------------------------------------- */}
      <div className="flex gap-3">
        {/* Image */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
          {item?.images?.[0]?.url ? (
            <Image
              src={item.images[0].url}
              alt={item?.title || "Product"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] text-zinc-400">
              No image
            </div>
          )}
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                {item?.title}
              </h3>

              <p className="mt-0.5 text-xs text-zinc-500">
                {item?.category?.name || "Fabric"}
                {" · "}
                ₹
                {Number(item?.price || 0).toLocaleString(
                  "en-IN"
                )}{" "}
                / meter
              </p>
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              aria-label={`Remove ${item?.title}`}
              className="shrink-0 rounded-lg p-1.5 text-zinc-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
            >
              <Trash2 size={16} strokeWidth={1.8} />
            </button>
          </div>

          <div className="flex items-start justify-between w-full items-b">
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-full bg-zinc-100 shadow-md border border-zinc-700 shadow-zinc-300 dark:shadow-none px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {activeColors.length}{" "}
                {activeColors.length === 1 ? "color" : "colors"}
              </span>

              {totalQuantity > 0 && (
                <span className="text-[11px] text-zinc-400">
                  {formatQuantity(totalQuantity)}m total
                </span>
              )}
            </div>

            <div className="text-right">
              <p className="text-[12px] text-zinc-400">
                Item total
              </p>
              <p className="mt-0.5 text-base font-bold text-zinc-900 dark:text-white">
                ₹{totalPrice.toLocaleString("en-IN")}
              </p>
            </div> 
 
          </div>
        </div>
      </div>

      {/* ------------------------------------------------
          COLOR SELECTOR
      ------------------------------------------------- */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            const quantity = Number(color.quantity || 0);
            const isSelected = selectedColorId === color.id;
            const isAvailable =
              Number(color.availableMeters || 0) > 0;

            return (
              <button
                key={color.id}
                type="button"
                onClick={() => setSelectedColorId(prev => prev === color.id ? null : color.id)}
                className={`
                  group relative flex items-center gap-1.5
                  rounded-full border px-2.5 py-1.5
                  text-[11px] transition-all
                  ${
                    isSelected
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900"
                      : isAvailable
                        ? "border-zinc-200 bg-zinc-100 shadow-md shadow-zinc-300 dark:shadow-none text-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                        : "border-zinc-200 bg-zinc-100 text-zinc-400 opacity-50 dark:border-zinc-800 dark:bg-zinc-900"
                  }
                `}
                aria-label={`Select ${color.name}`}
              >
                {/* Switch */}
                <span
                  className={`
                    h-3.5 w-3.5 rounded-full border
                    ${
                      !isAvailable
                        ? "grayscale opacity-50"
                        : ""
                    }
                  `}
                  style={{
                    backgroundColor:
                      color?.hex || "#d4d4d8",
                    borderColor:
                      isSelected
                        ? "rgba(255,255,255,.5)"
                        : "rgba(0,0,0,.1)",
                  }}
                />

                {/* Name */}
                <span className="max-w-20 truncate">
                  {color.name}
                </span>

                {/* Quantity */}
                <span
                  className={`
                    font-semibold
                    ${
                      quantity > 0
                        ? ""
                        : "opacity-40"
                    }
                  `}
                >
                  {quantity > 0
                    ? `${formatQuantity(quantity)}m`
                    : "—"}
                </span>

                {/* Low stock indicator */}
                {isAvailable &&
                  color.isLowStock &&
                  quantity > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-zinc-950" />
                  )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------
          COLLAPSIBLE QUANTITY CONTROL
      ------------------------------------------------- */}
      <AnimatePresence initial={false}>
        {selectedColor && (
          <motion.div
            key={selectedColor.id}
            initial={{
              opacity: 0,
              height: 0,
              y: -5,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -5,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-xl border border-zinc-400 bg-zinc-50 p-2.5 dark:border-zinc-800 dark:bg-zinc-900/70">
              <div className="flex items-center justify-between gap-3">
                {/* Selected color info */}
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-5 w-5 shrink-0 rounded-full border border-black/10"
                    style={{
                      backgroundColor:
                        selectedColor.hex || "#d4d4d8",
                    }}
                  />

                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-zinc-800 dark:text-zinc-200">
                      {selectedColor.name}
                    </p>

                    <p className="text-[10px] text-zinc-400">
                      {selectedColor.availableMeters}m available
                      {selectedColor.isLowStock && (
                        <span className="ml-1 text-amber-600">
                          · Low stock
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Quantity control */}
                <div className="flex shrink-0 items-center overflow-hidden rounded-lg border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-950">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={
                      Number(selectedColor.quantity || 0) <= 0
                    }
                    className="flex h-9 w-8 items-center justify-center text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-zinc-800 dark:hover:text-white"
                    aria-label={`Decrease ${selectedColor.name}`}
                  >
                    <Minus size={13} />
                  </button>

                  <input
                    type="number"
                    value={selectedColor.quantity || ""}
                    min="0.25"
                    max={selectedColor.availableMeters}
                    step="0.25"
                    onChange={(e) =>
                      updateColorQuantity(
                        selectedColor,
                        e.target.value
                      )
                    }
                    className="h-9 w-14 border-x border-zinc-300 bg-transparent text-center text-xs font-semibold text-zinc-900 outline-none [appearance:textfield] dark:border-zinc-700 dark:text-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    aria-label={`${selectedColor.name} quantity`}
                  />

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={
                      Number(selectedColor.quantity || 0) >=
                      Number(selectedColor.availableMeters || 0)
                    }
                    className="flex h-9 w-8 items-center justify-center text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-25 dark:hover:bg-zinc-800 dark:hover:text-white"
                    aria-label={`Increase ${selectedColor.name}`}
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* Current color subtotal */}
              <div className="mt-2 flex justify-between border-t border-zinc-400/70 pt-2 text-[10px] dark:border-zinc-800">
                <span className="text-zinc-400">
                  {formatQuantity(
                    Number(selectedColor.quantity || 0)
                  )}{" "}
                  meter
                  {Number(selectedColor.quantity || 0) !== 1
                    ? "s"
                    : ""}
                </span>

                <span className="font-medium text-zinc-600 dark:text-zinc-300">
                  ₹
                  {(
                    Number(selectedColor.quantity || 0) *
                    Number(item?.price || 0)
                  ).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

  
    </motion.article>
  );
}
