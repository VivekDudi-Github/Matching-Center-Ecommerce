"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FilterIcon, Menu, Minus, Moon, Sun } from "lucide-react";

import Card from "../../components/Card";
import Sidebar from "@/app/components/shop/Sidebar";
import MobileDrawer from "@/app/components/shop/MobileDrawer";

import {products} from '../../components/CardSlider';

export default function ShopLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    stock: true,
    sort: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const collapseAll = () => {
    setOpenSections({
      categories: false,
      price: false,
      stock: false,
      sort: false,
    });
  };
  

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between py-1 px-4 lg:p-4 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-xl font-bold dark:text-white">Shop</h1>
        <div className="flex items-center gap-4 p-1">

        {/* filter button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="flex items-center justify-center gap-2 rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <FilterIcon size={16} />
            Filter
          </button>
        </div>
      </div>
      
      {/* Reusable Mobile Drawer */}
      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
        <div onClick={collapseAll} className="mb-3 text-sm flex items-center justify-between gap-2 text-zinc-500 dark:text-zinc-400">
            <span>Search & Filters</span>
            <Minus size={16} className="ml-2 text-zinc-500 dark:text-zinc-300 cursor-pointer"  />
          </div>
        <Sidebar 
          openSections={openSections} 
          toggleSection={toggleSection} 
          collapseAll={collapseAll} 
        />
      </MobileDrawer>

      <div className="  px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-start  lg:flex-row gap-12">
        {/* Desktop Sidebar */}
        <aside className="hidden sticky top-22 lg:block w-64 shrink-0">
          <div onClick={collapseAll} className="mb-3 text-sm flex items-center justify-between gap-2 text-zinc-500 dark:text-zinc-400">
            <span>Search & Filters</span>
            <Minus size={16} className="ml-2 text-zinc-500 dark:text-zinc-300 cursor-pointer"  />
          </div>
          <Sidebar 
            openSections={openSections} 
            toggleSection={toggleSection} 
            collapseAll={collapseAll} 
          />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 w-full ">
          <div className="hidden lg:flex justify-between items-end mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight dark:text-white">Shop</h1>
          </div>

          {/* Product Flex */}
          <motion.div 
            className="flex flex-wrap justify-evenly items-center gap-3 md:gap-6" 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {products.map((item,i) => (
              <motion.div 
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Card fabricDetails={item}/>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
}