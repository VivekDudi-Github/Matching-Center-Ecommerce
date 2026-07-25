"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from './Card';

// Mock list array of fabrics to populate our slider
export const products = [
  { id: "fab-1", quantity: 1, title: "Premium Mulberry Silk", price: 24.99, originalPrice: 34.99,  saleTag: "28% OFF", imageUrl: "/dis_1.webp", color: "pink", description: "Luxurious silk fabric with a smooth texture, perfect for elegant garments and accessories.Luxurious silk fabric with a smooth texture, perfect for elegant garments and accessories." },
  { id: "fab-2", quantity: 1, title: "Organic Washed Linen", price: 18.50, originalPrice: null, saleTag: null, imageUrl: "/dis_2.webp", color: "pink", description: "Soft and breathable linen fabric, ideal for summer clothing and home decor projects." },
  { id: "fab-3", quantity: 1, title: "Heavyweight Cotton Canvas", price: 14.99, originalPrice: 19.99, saleTag: "Save $5", imageUrl: "/fabrics_3.webp", color: "maroon", description: "High-quality cotton fabric with a smooth texture, perfect for casual wear and everyday clothing." },
  { id: "fab-4", quantity: 1, title: "Merino Wool Knit", price: 29.99, originalPrice: 39.99, saleTag: "Winter Deal",imageUrl: "/fabrics_2.jpg", color: "red", description: "Soft and warm wool fabric, ideal for winter clothing and accessories." },
  { id: "fab-5", quantity: 1, title: "Vintage Floral Chiffon", price: 16.25, originalPrice: null, saleTag: null, imageUrl: "/fabrics_1.webp", color: "gray", description: "Traditional floral chiffon fabric, perfect for special occasions and weddings." },

  { id: "fab-31", quantity: 1, title: "Premium Mulberry Silk", price: 24.99, originalPrice: 34.99, saleTag: "28% OFF", imageUrl: "/dis_1.webp", color: "pink", description: "Luxurious silk fabric with a smooth texture, perfect for elegant garments and accessories." },
  { id: "fab-32", quantity: 1, title: "Organic Washed Linen", price: 18.50, originalPrice: null, saleTag: null, imageUrl: "/dis_2.webp", color: "maroon", description: "Soft and breathable linen fabric, ideal for summer clothing and home decor projects." },
  { id: "fab-33", quantity: 1, title: "Heavyweight Cotton Canvas", price: 14.99, originalPrice: 19.99, saleTag: "Save $5", imageUrl: "/fabrics_3.webp", color: "red", description: "High-quality cotton fabric with a smooth texture, perfect for casual wear and everyday clothing." },
  { id: "fab-34", quantity: 1, title: "Merino Wool Knit", price: 29.99, originalPrice: 39.99, saleTag: "Winter Deal", imageUrl: "/fabrics_2.jpg", color: "maroon", description: "Soft and warm wool fabric, ideal for winter clothing and accessories." },
  { id: "fab-35", quantity: 1, title: "Vintage Floral Chiffon", price: 16.25, originalPrice: null, saleTag: null, imageUrl: "/fabrics_1.webp", color: "gray", description: "Traditional floral chiffon fabric, perfect for special occasions and weddings." },

  { id: "fab-21", quantity: 1, title: "Premium Mulberry Silk", price: 24.99, originalPrice: 34.99, saleTag: "28% OFF", imageUrl: "/dis_1.webp", color: "pink", description: "Luxurious silk fabric with a smooth texture, perfect for elegant garments and accessories." },
  { id: "fab-22", quantity: 1, title: "Organic Washed Linen", price: 18.50, originalPrice: null, saleTag: null, imageUrl: "/dis_2.webp", color: "maroon", description: "Soft and breathable linen fabric, ideal for summer clothing and home decor projects." },
  { id: "fab-23", quantity: 1, title: "Heavyweight Cotton Canvas", price: 14.99, originalPrice: 19.99, saleTag: "Save $5", color: "red", imageUrl: "/fabrics_3.webp", description: "High-quality cotton fabric with a smooth texture, perfect for casual wear and everyday clothing." },
  { id: "fab-24", quantity: 1, title: "Merino Wool Knit", price: 29.99, originalPrice: 39.99, saleTag: "Winter Deal", color: "gray", imageUrl: "/fabrics_2.jpg", description: "Soft and warm wool fabric, ideal for winter clothing and accessories." },
  { id: "fab-25", quantity: 1, title: "Vintage Floral Chiffon", price: 16.25, originalPrice: null, saleTag: null, color: "pink", imageUrl: "/fabrics_1.webp", description: "Traditional floral chiffon fabric, perfect for special occasions and weddings." }

];

export default function CardSlider() {
  const sliderRef = useRef(null);
  const [positionX, setPositionX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [productsList, setProductsList] = useState(products);


  useEffect(() => {
    const resetWidth = async(resizedWindow = true) => {
    if (sliderRef.current ) {
      
      await new Promise(resolve => setTimeout(resolve, 1000));

      const remainingDistance = sliderRef.current.scrollWidth - sliderRef.current.offsetWidth;
      setMaxScroll(remainingDistance);

      if(resizedWindow) setPositionX((prev) => prev <= -remainingDistance ? -remainingDistance : prev/2);
    }}
    
    const observer = new ResizeObserver(() => {
       requestAnimationFrame(resetWidth);
    });
    observer.observe(sliderRef.current);

    return () => {
      observer.disconnect();
    } 
  }, []); 

  
  const slideLeft = () => {
    setPositionX((prev) => Math.min(prev + 360, 0)); // Slides view window back left
  };

  const slideRight = () => { 
    setPositionX((prev) => Math.max(prev - 360, -maxScroll)); // Slides view window forward right
  };

  return (
    <div className="w-full touch-pan-y dark:bg-black px-6 py-12 md:px-16">
      {/* Top Header Row with Navigation Controls */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-transparent sm:text-3xl bg-gradient-to-r dark:from-zinc-100 from-zinc-900 dark:zinc-500 via-zinc-600 to-amber-800 bg-clip-text"> 
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
          drag='x'
          dragElastic={0.2} 
          dragConstraints={{ left: -maxScroll, right: 0 }}
           onDragEnd={(event, info) => {
            const swipeThreshold = 50; // Minimum pixel distance to trigger a slide
            const { offset } = info;

            if (offset.x < -swipeThreshold && positionX > -maxScroll) {
              slideRight();
            } else if (offset.x > swipeThreshold && positionX < 0) {
              slideLeft();
            }
          }}
          animate={{ x: positionX }}
          transition={{ type: "spring", stiffness: 180, damping: 24 }}
          className="flex gap-6 pb-4 hover:cursor-pointer"
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
