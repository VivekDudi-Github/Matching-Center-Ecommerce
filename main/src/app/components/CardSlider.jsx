"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from './Card';

// Mock list array of fabrics to populate our slider
const productsList = [
  { id: "fab-1", title: "Premium Mulberry Silk", price: 24.99, originalPrice: 34.99, unit: "yard" , saleTag: "28% OFF", imageUrl: "/dis_1.webp" },
  { id: "fab-2", title: "Organic Washed Linen", price: 18.50, originalPrice: null, saleTag: null,unit: "yard" , imageUrl: "/dis_2.webp" },
  { id: "fab-3", title: "Heavyweight Cotton Canvas", price: 14.99, originalPrice: 19.99, saleTag: "Save $5",unit: "yard" , imageUrl: "/fabrics_3.webp" },
  { id: "fab-4", title: "Merino Wool Knit", price: 29.99, originalPrice: 39.99, saleTag: "Winter Deal",unit: "yard" ,imageUrl: "/fabrics_2.jpg" },
  { id: "fab-5", title: "Vintage Floral Chiffon", price: 16.25, originalPrice: null, saleTag: null,unit: "yard" , imageUrl: "fabrics_1.webp" },

  { id: "fab-31", title: "Premium Mulberry Silk", price: 24.99, originalPrice: 34.99, saleTag: "28% OFF",unit: "yard" , imageUrl: "/dis_1.webp" },
  { id: "fab-32", title: "Organic Washed Linen", price: 18.50, originalPrice: null, saleTag: null,unit: "yard" , imageUrl: "/dis_2.webp" },
  { id: "fab-33", title: "Heavyweight Cotton Canvas", price: 14.99, originalPrice: 19.99, saleTag: "Save $5",unit: "yard" , imageUrl: "/fabrics_3.webp" },
  { id: "fab-34", title: "Merino Wool Knit", price: 29.99, originalPrice: 39.99, saleTag: "Winter Deal",unit: "yard" , imageUrl: "/fabrics_2.jpg" },
  { id: "fab-35", title: "Vintage Floral Chiffon", price: 16.25, originalPrice: null, saleTag: null,unit: "yard" , imageUrl: "fabrics_1.webp" },

  { id: "fab-21", title: "Premium Mulberry Silk", price: 24.99, originalPrice: 34.99, saleTag: "28% OFF",unit: "yard" , imageUrl: "/dis_1.webp" },
  { id: "fab-22", title: "Organic Washed Linen", price: 18.50, originalPrice: null, saleTag: null, imageUrl: "/dis_2.webp" },
  { id: "fab-23", title: "Heavyweight Cotton Canvas", price: 14.99, originalPrice: 19.99, saleTag: "Save $5",unit: "yard" , imageUrl: "/fabrics_3.webp" },
  { id: "fab-24", title: "Merino Wool Knit", price: 29.99, originalPrice: 39.99, saleTag: "Winter Deal",unit: "yard" , imageUrl: "/fabrics_2.jpg" },
  { id: "fab-25", title: "Vintage Floral Chiffon", price: 16.25, originalPrice: null, saleTag: null,unit: "yard" , imageUrl: "fabrics_1.webp" },

];

export default function CardSlider() {
  const sliderRef = useRef(null);
  const [positionX, setPositionX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  // const [hasMounted, setHasMounted] = useState(false);

  // useEffect(() => {setHasMounted(true)}, []);

  useEffect(() => {
    let resetWidth = () => {
      if (sliderRef.current ) {
        const remainingDistance = sliderRef.current.scrollWidth - sliderRef.current.offsetWidth;
        setMaxScroll(remainingDistance > 0 ? remainingDistance : 0);
      }
    }
    resetWidth();
  }, []); 
  
  //  useEffect(() => {
  //   if (hasMounted && sliderRef.current) {
  //     const remainingDistance = sliderRef.current.scrollWidth - sliderRef.current.offsetWidth;
  //     setMaxScroll(remainingDistance > 0 ? remainingDistance : 0);
  //   }
  // }, [hasMounted]);

  const slideLeft = () => {
    setPositionX((prev) => Math.min(prev + 360, 0)); // Slides view window back left
  };

  const slideRight = () => {
    setPositionX((prev) => Math.max(prev - 360, -maxScroll)); // Slides view window forward right
  };

  return (
    <div className="w-full touch-pan-y bg-zinc-950 px-6 py-12 md:px-16">
      {/* Top Header Row with Navigation Controls */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-transparent sm:text-3xl bg-gradient-to-r from-zinc-100 via-zinc-500 to-amber-800 bg-clip-text"> 
            Featured Fabrics
          </h2>
          <p className="mt-1 text-sm text-zinc-400">Explore premium textiles and luxury weave materials.</p>
        </div>

        {/* Direction Controls */}
        <div className="flex gap-2">
          <button
            onClick={slideLeft}
            disabled={positionX === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white disabled:opacity-30"
            aria-label="Slide Left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={slideRight}
            disabled={positionX <= -maxScroll}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white disabled:opacity-30"
            aria-label="Slide Right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Hidden Overflow Mask */}
      <div ref={sliderRef} className="w-full min-h-72 overflow-hidden rounded-3xl">
        {/* Animated Slide Track */}
        <motion.div
          animate={{ x: positionX }}
          transition={{ type: "spring", stiffness: 180, damping: 24 }}
          className="flex gap-6 pb-4 cursor-grab active:cursor-grabbing"
        >
          {productsList.map((product) => (
            <div key={product.id} className="w-80  shrink-1">
              <Card fabricDetails={product} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
