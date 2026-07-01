'use client';

import {useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Minus } from "lucide-react";
import PriceSlider from "./PriceSlider";

export default function Sidebar({ openSections, toggleSection, collapseAll }) {
  const [priceRange, setPriceRange] = useState([0, 500]);

  const categories = ["Cotton & Linen", "Silk & Satin", "Upholstery Blends"];

  return (
    <div className="flex flex-col gap-6 text-zinc-900 dark:text-zinc-100">
      <div className="flex items-center justify-between">
        <button 
          onClick={collapseAll}
          className="flex items-center gap-2 text-sm font-semibold hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
        >
          Collapse All <Minus size={16} />
        </button>
      </div>

      {/* Categories */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
        <button 
          onClick={() => toggleSection("categories")}
          className="flex items-center justify-between w-full text-left font-medium mb-4"
        >
          Categories
          {openSections.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <AnimatePresence>
          {openSections.categories && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col gap-3 overflow-hidden"
            >
              {categories.map((cat) => (
                <label key={cat} className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="mt-1 rounded border-zinc-300 dark:border-zinc-700 text-black dark:text-white focus:ring-black dark:focus:ring-white bg-transparent" 
                  />
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">{cat}</span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
        <button 
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-left font-medium mb-4"
        >
          Price
          {openSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <AnimatePresence>
          {openSections.price && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col gap-4 overflow-hidden"
            >
              <div className="flex justify-between text-xs font-medium">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <PriceSlider
                min={0}
                max={1500}
                value={priceRange}
                onValueChange={setPriceRange}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stock */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
        <button 
          onClick={() => toggleSection("stock")}
          className="flex items-center justify-between w-full text-left font-medium"
        >
          Stock
          {openSections.stock ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <label className="flex items-start gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            className="mt-1 rounded border-zinc-300 dark:border-zinc-700 text-black dark:text-white focus:ring-black dark:focus:ring-white bg-transparent" 
          />
          <span className="text-sm text-zinc-600 dark:text-zinc-400">In Stock</span>
        </label>
      </div>
    </div>
  );
}