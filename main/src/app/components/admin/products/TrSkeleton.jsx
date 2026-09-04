'use client';

import { motion } from "framer-motion";

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

function SkeletonBlock({ className }) {
  return (
    <div className={`relative overflow-hidden bg-zinc-200 dark:bg-zinc-800 rounded ${className}`}>
      {/* Animated shimmering overlay */}
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 dark:via-white/10 to-transparent"
      />
    </div>
  );
}

export default function TableLoading({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center h-24 justify-start gap-4 py-4 px-4 text-sm border-b border-zinc-200 dark:border-zinc-800"
        >
            
          <SkeletonBlock className="h-16 w-16 shrink-0 rounded-lg" />
 
          <div className="flex flex-1 items-center justify-between gap-6">

            <div className="flex-1 min-w-37.5">
              <SkeletonBlock className="h-4 w-3/4 mb-2" />
              <SkeletonBlock className="h-3 w-1/2" />
            </div>

            <div className="flex-1 hidden sm:block">
              <SkeletonBlock className="h-4 w-2/3" />
            </div>

            <div className="flex-1 hidden md:block">
              <SkeletonBlock className="h-4 w-2/4" />
            </div>

            <div className="w-24 flex justify-end">
              <SkeletonBlock className="h-6 w-16 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
