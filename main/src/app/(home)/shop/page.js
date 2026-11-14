"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangleIcon, FilterIcon, Minus} from "lucide-react";

import Card from "../../components/card/Card";
import Sidebar from "@/app/components/shop/Sidebar";
import MobileDrawer from "@/app/components/shop/MobileDrawer";

import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/app/lib/axios";
import CardSkeleton from "@/app/components/card/CardSkeleton";

export default function ShopLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchParams, setSearchParams] = useState(new URLSearchParams());

  const [openSections, setOpenSections] = useState({
    categories: false,
    price: true,
    stock: true,
    sort: false,
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

  const categoryId = searchParams.get("categoryId") ?? "";
  const outOfStock = searchParams.get("outOfStock") ?? "true";
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";
  const sort = searchParams.get("sort") ?? "featured";
  const search = searchParams.get("search") ?? "";

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["shop-products", categoryId, outOfStock, minPrice, maxPrice, sort, search],
    queryFn: async ({ pageParam }) => {
      const query = new URLSearchParams();
      if (pageParam) {
        query.set("cursor", pageParam);
      }
      if (categoryId) query.set("categoryId", categoryId);
      if (outOfStock) query.set("outOfStock", outOfStock);
      if (minPrice) query.set("minPrice", minPrice);
      if (maxPrice) query.set("maxPrice", maxPrice);
      if (sort) query.set("sort", sort);
      if (search) query.set("searchText", search);
      const res = await api.get(`/shop/products?${query}`);
      return res.data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.newCursor || undefined,
  });

  const products = data?.pages?.flatMap((page) => page?.products) ?? [];
  const cursor = data?.pages?.[data.pages.length - 1]?.newCursor || null;

  const triggerCursorFetch = async(index) => {
    if(index === products.length - 4 && hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black -mt-12 transition-colors duration-300">
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between py-1 pt-14 px-4 lg:p-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="">
          <h1 className="text-xl font-bold dark:text-white">Shop</h1>
          <p className="mt-1 flex sm:text-base text-xs text-red-500 ">
            <AlertTriangleIcon className="mr-1 size-3.5 sm:size-5 " />
            The deliveries are only available in HARYANA at moment.
          </p>
        </div>
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
          setParams={setSearchParams}
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
            setParams={setSearchParams}
            openSections={openSections}
            toggleSection={toggleSection}
            collapseAll={collapseAll}
          />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 w-full ">
          <div className="hidden lg:flex justify-between items-end mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight dark:text-white">Shop</h1>
            <p className="mt-1 flex sm:text-base text-base text-red-500 ">
              <AlertTriangleIcon className="mr-2 size-5 " />
              The deliveries are only available in HARYANA at moment.
            </p>
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
                key={item.id}
                onViewportEnter={() => triggerCursorFetch(i)}
                viewport={{
                  once: true,
                  amount: 0.5,
                }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Card fabricDetails={item}/>
              </motion.div>
            ))}
            {isFetchingNextPage &&
              Array.from({length: 10}).map((_, i) =>
                <CardSkeleton key={i} />
              )
            }
          </motion.div>
        </main>
      </div>
    </div>
  );
}