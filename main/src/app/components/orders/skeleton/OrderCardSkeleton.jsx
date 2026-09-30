"use client";
import {motion} from "framer-motion";
import {SkeletonBlock} from "@/app/hooks/SkeletonComp";

function OrderCardSkeleton() {
  return (
    
    <motion.article
      layout
      className="overflow-hidden mb-3 rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-500 dark:shadow-none dark:border-zinc-800 dark:bg-zinc-950"
    >
      {/* Order Header */}
      <div className="p-4 sm:p-5">
        <SkeletonBlock className="h-8 w-full" />
      </div>

      {/* Order Total */}
      <div className="border-t border-zinc-400 bg-zinc-50/70 px-4 py-4 dark:border-zinc-700 dark:bg-zinc-900/40 sm:px-5">
        <SkeletonBlock className="h-7 w-28 rounded-md" />
      </div>
    </motion.article>
  )
}

export default OrderCardSkeleton