"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price ↑" },
  { value: "price-desc", label: "Price ↓" },
];

export function SortSelector({ sortBy="featured", setSortBy, openSections, toggleSection }) {
console.log(openSections);

    return (
 <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
  <div className="flex items-center w-full">

    {/* Section toggle */}
    <button
      onClick={() => toggleSection("sort")}
      className="flex items-center gap-2 text-left font-medium text-zinc-900 dark:text-zinc-100"
    >
      Sort
    </button>

    {/* Right side controls */}
    <div className="ml-auto flex items-center">

      {/* Sort */}
      <div className="relative">
        <button
          type="button"
          onClick={() => toggleSection("sort")}
          className="
            relative flex items-center gap-1.5
            h-8 pl-4 pr-2
            text-[12px] font-medium
            text-zinc-500 dark:text-zinc-400
            transition-colors
            hover:text-zinc-900 dark:hover:text-zinc-100
          "
        >
                <span
                className="
                    pointer-events-none
                    absolute inset-y-0 left-0
                    w-20
                    rounded-l-sm

                    border-y-2 border-l-2
                    border-zinc-500/50

                    mask-[linear-gradient(to_right,black_0%,black_35%,transparent_100%)]
                    [-webkit-mask-image:linear-gradient(to_right,black_0%,black_35%,transparent_100%)]

                    dark:border-zinc-400
                    "
                />

          {/* Soft fade behind the selector */}
          <span
            className="
              pointer-events-none absolute inset-y-0 left-0 right-0 -z-10
              bg-linear-to-r
              from-zinc-100/80 via-zinc-50/30 to-transparent
              dark:from-zinc-800/70 dark:via-zinc-900/20
            "
          />

          <span className="whitespace-nowrap">
            {sortOptions.find((option) => option.value === sortBy)?.label}
          </span>

          <motion.span
            animate={{ rotate: openSections.sort ? 180 : 0 }}
            transition={{ duration: 0.18 }}
          >
            <ChevronDown size={13} strokeWidth={1.7} />
          </motion.span>
        </button>

        <AnimatePresence>
          {openSections.sort && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="
                absolute right-0 top-full z-30 mt-2
                min-w-38.75
                overflow-hidden
                rounded-lg
                border border-zinc-200/80
                bg-white/95
                p-1
                shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]
                backdrop-blur-xl
                dark:border-zinc-700/80
                dark:bg-zinc-900/95
              "
            >
              {sortOptions.map((option) => {
                const active = sortBy === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      toggleSection("sort");
                    }}
                    className={`
                      flex w-full items-center
                      rounded-md px-3 py-2
                      text-left text-[12px]
                      transition-colors
                      ${
                        active
                          ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/70 dark:hover:text-zinc-100"
                      }
                    `}
                  >
                    {option.label}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>


    </div>
  </div>
</div>
    )};


           
// <button
//                 className="
//                     group relative
//                     flex h-8 items-center gap-1.5
//                     pl-4 
//                     text-[11px] font-medium
//                     text-zinc-800
//                     dark:text-zinc-400
//                     overflow-x-hidden
//                 "
//             >

//                 <span>
//                 {sortOptions.find(x => x.value === sortBy)?.label}
//                 </span>

//                 <ChevronDown
//                 size={16}
//                 strokeWidth={1.7} 
//                 className={`text-white ${openSections.sort ? "rotate-180 duration-200 " : ""}`}
//                 />
//             </button>