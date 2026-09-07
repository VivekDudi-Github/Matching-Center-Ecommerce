"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Scissors } from "lucide-react";

export default function SafeImage({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative h-full w-full bg-zinc-950">
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center animate-pulse  bg-zinc-900">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-zinc-500 dark:via-zinc-300 via-zinc-800/60 to-transparent" />
          <Scissors className="h-8 w-8 animate-pulse text-amber-700" />
        </div>
      )}

      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 0.9 : 0 }}
        whileHover={{ scale: 1.06 }}
        transition={{ 
          opacity: { duration: 0.4 },
          scale: { duration: 0.6, ease: "easeOut" }
        }}
        onLoad={() => setIsLoaded(true)} 
      />
    </div>
  );
}
