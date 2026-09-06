"use client";
import React from 'react'

import { motion } from "framer-motion";

// 1. Smooth continuous shimmer animation configuration
const shimmerVariants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

// 2. Reusable Skeleton Block component
function SkeletonBlock({ className }) {
  return (
    <div className={`relative overflow-hidden bg-zinc-200 dark:bg-zinc-800 rounded-lg ${className}`}>
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 dark:via-white/10 to-transparent"
      />
    </div>
  );
}

// 3. Main Product Page Skeleton Component
export default function ProductPageSkeleton() {
  return (
    <div className="  px-4 py-8 md:py-12 md:pt-16 pt-14 bg-white dark:bg-black -mt-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-start">
        
        <div className="flex flex-col-reverse lg:flex-row gap-4 w-full">
          
          {/* Thumbnails Array Column */}
          {/* Mobile: horizontal row underneath main image */}
          {/* Desktop: vertical column on the leftmost side */}
          <div className="flex flex-row lg:flex-col gap-3 overflow-x-hidden lg:overflow-x-visible shrink-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBlock 
                key={i} 
                className="h-20 w-20 lg:h-24 lg:w-24 shrink-0 rounded-md" 
              />
            ))}
          </div>

          {/* Main Hero Product Image */}
          <div className="flex-1 w-full aspect-square lg:aspect-4/5">
            <SkeletonBlock className="w-full h-full" />
          </div>

        </div>

        <div className="flex flex-col gap-6 w-full">
          
          {/* Category */}
          <SkeletonBlock className="h-4 w-1/4" />

          {/* Product Big Title Blocks (2 lines) */}
          <div className="flex flex-col gap-2">
            <SkeletonBlock className="h-8 w-11/12 lg:h-10" />
            <SkeletonBlock className="h-8 w-2/3 lg:h-10" />
          </div>

          {/* Pricing & Rating Info Row */}
          <div className="flex items-center gap-4 py-2 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <SkeletonBlock className="h-7 w-28 rounded-md" /> 
            <SkeletonBlock className="h-5 w-24" />             
          </div>

          {/* Variant Selectors (e.g., Size or Color Circles) */}
          <div className="flex flex-col gap-3">
            <SkeletonBlock className="h-4 w-16" /> {/* Label */}
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-10 w-10 rounded-full" />
              ))}
            </div>
          </div>

          {/* Long Description Text Paragraph lines */}
          <div className="flex flex-col gap-2.5 mt-2">
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-11/12" />
            <SkeletonBlock className="h-4 w-4/5" />
          </div>

          {/* Primary Action Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <SkeletonBlock className="h-12 flex-1 rounded-xl" /> 
            <SkeletonBlock className="h-12 w-full sm:w-14 rounded-xl" /> 
          </div>

        </div>

      </div>
    </div>
  );
}
