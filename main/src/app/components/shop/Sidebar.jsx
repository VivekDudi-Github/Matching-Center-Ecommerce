'use client';

import {useEffect, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, FilterIcon, Minus, SearchIcon } from "lucide-react";
import PriceSlider from "./PriceSlider";
import { getShopSelections } from "@/app/lib/actions/shopActions";
import { SortSelector } from "./SortSelector";


const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "newest", label: "Newest" },
];

export default function Sidebar({ openSections, toggleSection, collapseAll }) {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [isLoading, setisLoading] = useState(false);
  
  const [priceLow, setPriceLow] = useState(0);
  const [priceHigh, setPriceHigh] = useState(500);

  const [categories, setCategories] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");


  const updateUrl = () => {
    const params = new URLSearchParams();

  }

  const handleCategoryChange = (category) => {
    if(selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  useEffect(() =>{
    const fetchSelections = async () => {
      setisLoading(true);
      const res = await getShopSelections();
      console.log("res:", res);
      setCategories(res.categories);
      setPriceLow(Number(res.priceRange.low));
      setPriceHigh(Number(res.priceRange.high));

      setPriceRange([Number(res.priceRange.low), Number(res.priceRange.high)])
      setisLoading(false);
    }

    fetchSelections();
  }, [])

  return (
    <div className="flex flex-col gap-6 text-zinc-900 dark:text-zinc-100">
     {/* Search */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 ">
        <div className="flex items-center justify-between w-full text-left font-medium">
          <div className="flex items-center gap-2 relative w-full">
            <input 
              type="text" 
              value={search} 
              placeholder="Give your best guess"
              onChange={(e) => setSearch(e.target.value)} 
              className="w-full rounded-sm border border-zinc-300 bg-white py-3 pl-11 pr-3 text-sm outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
            />
            <SearchIcon className="absolute left-4" size={18} />
          </div>
        </div>
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
                <label key={cat?.id || cat?.name} className="flex items-start gap-3 cursor-pointer">
                  <input 
                    checked={selectedCategories.includes(cat?.name)}
                    onChange={() => handleCategoryChange(cat?.name)}
                    type="checkbox" 
                    className="mt-1 rounded border-zinc-300 dark:border-zinc-700 text-black dark:text-white focus:ring-black dark:focus:ring-white bg-transparent" 
                  />
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">{cat?.name} {`(${cat?._count?.products})`}</span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price */}
      {isLoading ?
        <div className="border-t border-zinc-200 space-y-2 dark:border-zinc-800 pt-4">
          <div className="h-4 rounded-full bg-slate-600 animate-pulse"/> 
        </div> :
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
                  <input type="text" value={priceRange[0]} onChange={(e) => setPriceRange([e.target.value, priceRange[1]])} className="w-16 text-center border" />
                  <input type="text" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], e.target.value])} className="w-16 text-center border" />
                </div>
                <PriceSlider
                  min={priceLow}
                  max={priceHigh}
                  value={priceRange}
                  step={1}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between text-xs font-medium">
                  <span>₹{priceLow}</span>
                  <span>₹{priceHigh}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>  
      }

      <SortSelector setSortBy={setSortBy} sortBy={sortBy} openSections={openSections} toggleSection={toggleSection} />

      {/* Stock */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
        <button 
          onClick={() => toggleSection("stock")}
          className="flex items-center justify-between w-full text-left font-medium"
        >
          Stock
          {openSections.stock ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <AnimatePresence> 
          {openSections.stock && ( 
             <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col gap-3 overflow-hidden"
            > 
              <label className="group flex cursor-pointer items-start pt-4 gap-3"> 
                <input type="checkbox" className=" mt-0.5 h-4 w-4 cursor-pointer rounded-xs border-zinc-300 bg-transparent text-zinc-950 accent-zinc-950 focus:ring-1 focus:ring-zinc-900 focus:ring-offset-0 dark:border-zinc-700 dark:bg-transparent dark:text-white dark:accent-white dark:focus:ring-zinc-300 " /> 
                  <span className=" text-sm text-zinc-600 transition-colors duration-200 group-hover:text-zinc-950 dark:text-zinc-400 dark:group-hover:text-white " > 
                    In Stock 
                  </span> 
                </label>
             </motion.div> 
            )} 
          </AnimatePresence> 
        
      </div>
  
      {/* filter button */}
      <button
        className="
          group relative w-full overflow-hidden
          border border-zinc-700/80
          bg-zinc-950
          px-4 py-2.5
          text-sm font-medium tracking-wide text-white
          shadow-[0_4px_20px_rgba(0,0,0,0.25)]
          transition-all duration-300
          hover:border-amber-700
          dark:hover:border-amber-200/50
          hover:shadow-[0_6px_28px_rgba(0,0,0,0.35)]
          active:translate-y-px
          cursor-pointer
        "
        onClick={updateUrl}
      >
        <span
          className="
            absolute inset-0
            -translate-x-full
            bg-linear-to-r
            from-transparent via-white/10 to-transparent
            transition-transform duration-700
            group-hover:translate-x-full
          "
        />

        <span className="relative flex items-center justify-center gap-2">
          Filter Now
          <span className="text-[10px] text-amber-200/80 transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </button>
    </div>
  );
}