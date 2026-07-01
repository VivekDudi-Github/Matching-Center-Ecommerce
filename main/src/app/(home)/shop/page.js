"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, Moon, Sun } from "lucide-react";

import Card from "../../components/Card";
import Sidebar from "@/app/components/shop/Sidebar";
import MobileDrawer from "@/app/components/shop/MobileDrawer";

import {products} from '../../components/CardSlider';

export default function ShopLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sidebar state managed here so mobile & desktop stay synchronized
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    stock: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const collapseAll = () => {
    setOpenSections({
      categories: false,
      price: false,
      stock: false,
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-xl font-bold dark:text-white">Shop</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 dark:text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Reusable Mobile Drawer */}
      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
        <Sidebar 
          openSections={openSections} 
          toggleSection={toggleSection} 
          collapseAll={collapseAll} 
        />
      </MobileDrawer>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-12">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
            Shop All
          </div>
          <Sidebar 
            openSections={openSections} 
            toggleSection={toggleSection} 
            collapseAll={collapseAll} 
          />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          <div className="hidden lg:flex justify-between items-end mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight dark:text-white">Shop</h1>
          </div>

          {/* Product Grid */}
          <motion.div 
            className="grid grid-cols-3 sm:grid-cols-3 xl:grid-cols-3 gap-6" 
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