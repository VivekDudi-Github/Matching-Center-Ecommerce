"use client";

import React from "react";
import { motion } from "framer-motion";
import SafeImage from "../SafeImage";

function CardSkeleton() {
  return (
    <div className="  flex  items-center justify-center bg-transparent  w-36 md:w-76 h-full md:h-auto transition-all duration-200 "> 
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="group relative w-full max-w-sm overflow-hidden rounded-md bg-white/80 dark:bg-zinc-950 md:p-1 p-1 shadow-sm shadow-amber-800/20 border border-stone-300 dark:border-zinc-800/80 dark:hover:border-zinc-700/50  transition-shadow duration-300 hover:shadow-xl "
      >
        <div className="relative md:h-64 h-36 w-full overflow-hidden rounded-md inline-block bg-stone-100">
          <SafeImage  />
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-stone-900/10 via-transparent to-transparent pointer-events-none" />
        </div>


         <div className="md:mt-4 mt-1 px-1 pb-1">
          {/* Title */}
          <div>
            <div className=" bg-slate-500 md:ml-0 -ml-1 dark:bg-white/80 animate-pulse rounded-md h-4 w-12 duration-300 "/> 
               
          </div>

          {/* Description */}
          <div className="mt-2 line-clamp-2 md:h-12 h-0 space-y-1  ">
            <div className="bg-slate-500 dark:bg-white/80 animate-pulse duration-200 rounded-md h-2 w-1/8 "/>
            <div className="bg-slate-500 dark:bg-white/80 animate-pulse duration-150 rounded-md h-2 w-1/3 "/>
          </div>

          {/* Price & Action Row */}
          <div className="flex justify-between items-end"> 
            <div className="md:mt-5 mt-1 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="md:text-sm text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                  Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="flex gap-0.5 md:text-xl text-[12px] font-bold dark:text-zinc-100 text-black -ml-1">
                    <div className="md:w-4 w-3 h-5 md:h-6  bg-slate-600 dark:bg-white/80 animate-pulse rounded-md"/>
                    <div className="w-2 h-5 md:h-6 bg-slate-600 dark:bg-white/80 animate-pulse rounded-md"/>
                  
                  </span>
                  
                  <span className="text-[10px] md:text-sm text-zinc-500 line-through -ml-1 ">
                    {/* <div className="w-2 h-2 bg-slate-600 animate-pulse rounded-md"/> */}
                  90
                  </span> 
                </div>
              </div>
            </div>
             <div className="md:rounded-2xl rounded-lg md:h-12 md:w-20 w-16 h-8 bg-slate-600 dark:bg-white/80 animate-pulse" />
          </div>
         
        </div>
      </motion.div>
    </div>
  )
}

export default CardSkeleton