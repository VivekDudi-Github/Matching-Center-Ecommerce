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


export function SkeletonBlock({ className }) {
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