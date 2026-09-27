"use client";
import {motion} from "framer-motion";


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


function SkeletonBlock({ className }) {
  return (
    <div className={`relative overflow-hidden bg-zinc-700 dark:bg-zinc-800 rounded-lg ${className}`}>
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 dark:via-white/10 to-transparent"
      />
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div>
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-400 dark:shadow-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 sm:p-6"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Avatar */}
          <div className="flex shrink-0 items-center">
            <SkeletonBlock className="h-20 w-20 rounded-full" />
          </div>

          {/* Customer information */}
          <div className="min-w-0 flex-1">
            <SkeletonBlock className="h-8 w-full" />
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default HeaderSkeleton