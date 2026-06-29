"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Scissors, Check } from "lucide-react";
import SafeImage from "./SafeImage";

// const fabricData = {
//   id: "fab-01",
//   title: "Premium Mulberry Silk",
//   price: 240,
//   originalPrice: 340,
//   unit: "yard",
//   saleTag: "28% OFF",
//   imageUrl: "/dis_1.webp",
//   description: "Pure 19mm mulberry silk with a luminous satin finish. Perfect for bridal, evening wear, and luxury linings.",
//};

export default function FabricProductCard({fabricDetails}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const fabricData = fabricDetails;

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex  items-center justify-center bg-transparent  w-36 h-full md:h-auto md:w-76 transition-all duration-200 "> 
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="group relative w-full max-w-sm overflow-hidden rounded-md bg-white dark:bg-zinc-950 md:p-1 p-1 shadow-sm shadow-amber-800/20 border border-stone-300 dark:border-zinc-800/80 dark:hover:border-zinc-700/50  transition-shadow duration-300 hover:shadow-xl "
      >
        {/* Top Badges Overlay */}
        <div className="absolute md:top-6 top-4 md:left-6 left-4 z-10 flex items-center gap-2 duration-200">
          {fabricData.saleTag && (
            <span className="rounded-full bg-red-500 px-3 py-1 md:text-xs text-[7px] font-bold tracking-wide text-white shadow-sm"> 
              {fabricData.saleTag}
            </span>
          )}
          <span className=" items-center gap-1 md:flex hidden rounded-full bg-white/90 backdrop-blur-md px-2.5 py-1 md:text-xs text-[5px]  font-medium text-stone-700 shadow-sm border border-stone-100">
            <Scissors className="h-3 w-3 text-amber-700" />
            By the {fabricData.unit}
          </span>
        </div>

        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute md:top-6 top-4 right-6 z-10 flex md:size-9 size-5 p-0.5 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-stone-600 shadow-sm border border-stone-100 transition-all hover:bg-white hover:scale-105 active:scale-95"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-stone-600 group-hover:text-red-400"
            }`}
          />
        </button>

        <div className="relative md:h-64 h-36 w-full overflow-hidden rounded-md bg-stone-100">
            <SafeImage src={fabricData.imageUrl} alt={fabricData.title} />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content Area */}
        <div className="md:mt-4 mt-1 px-1 pb-1">
          {/* Title */}
          <h3 className="md:text-xl text-[12px] font-semibold min-h-[36px] text-stone-800 dark:text-stone-100 tracking-tight group-hover:text-amber-900 dark:group-hover:text-amber-400 transition-colors">
            {fabricData.title}
          </h3>

          {/* Description */}
          <p className="mt-1 line-clamp-2 md:text-sm text-[12px] md:block hidden  text-stone-500 leading-relaxed">
            {fabricData.description}
          </p>

          {/* Price & Action Row */}
          <div className="md:mt-5 mt-1 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="md:text-sm text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className=" md:text-xl text-[12px] font-bold dark:text-zinc-100 -ml-1">₹{fabricData.price}</span>
                {fabricData.originalPrice && (
                  <span className="text-[10px] md:text-sm text-zinc-500 line-through -ml-1 ">
                    ₹{fabricData.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Micro-interactive Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              disabled={isAdded}
              whileTap={{ scale: 0.95 }}
              className={`relative flex md:h-12 h-8  items-center justify-center overflow-hidden rounded-xl px-5  font-medium transition-all shadow-sm ${
                isAdded 
                  ? "bg-emerald-600 text-white md:w-36  max-w-2/5" 
                  : "bg-stone-900 text-white hover:bg-amber-900 md:w-32 w-6"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {!isAdded ? (
                  <motion.span
                    key="add"
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center text-[12px] gap-1 font-semibold tracking-wide"
                  >
                    <ShoppingCart className="size-4 stroke-[2]" />
                    <span className="hidden md:inline ">Add to Cart</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="added"
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1.5 text-xs font-semibold tracking-wide"
                  >
                    <Check className="md:h-4 md:w-4 h-1 w-1 stroke-[3]" />
                    Added!
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
