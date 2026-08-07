"use client";

import React, { useEffect, useState } from 'react';
import { ShoppingCart, Zap, Star, Check } from 'lucide-react';
import ProductGallery from '@/app/components/product/ProductGallery';
import ColorSelector from '@/app/components/product/ColorSelector';
import useCartStore from '@/app/store/CartStore';
import CardSlider from '@/app/components/CardSlider';
import { AnimatePresence , motion} from 'framer-motion';
import { useHydratedStore } from '@/app/hooks/useHyderatedStore';
import Skeleton from '@/app/components/product/ProductPageSkeleton';


const PRODUCT_DATA = {
  title: 'Premium Handwoven Silk Blend Fabric - 1 Yard',
  id: 'fab-91',
  price: '₹35.00',
  originalPrice: '₹50.00',
  rating: 4.8,
  reviews: 124,
  description: 'Elevate your tailoring with our premium silk blend. Woven for durability while maintaining a luxurious sheen, this fabric is ideal for festive wear, evening gowns, and high-end upholstery.',
  quantity: 1,
  images: [
    '/dis_1.webp',
    '/dis_2.webp',
    '/fabrics_1.webp',
    '/fabrics_2.jpg',
    '/fabrics_3.webp',
  ],
  color: [
    { name: 'Sunset Orange', hex: '#f05f19' },
    { name: 'Crimson Red', hex: '#e20000' },
    { name: 'Midnight Black', hex: '#000000' },
  ],
};

export default function ProductPage() {
  const isHyderated = useHydratedStore();
  
  const [selectedColor, setSelectedColor] = useState(null); 
  const addItem = useCartStore(s => s.addItem);
  const items = useCartStore(s => s.items);

  const [isAdded, setIsAdded] = useState(false);

  const handleColorSelect = (color) => {
    setSelectedColor(color.hex);
  }

  const handleAddToCart = () => {
    setIsAdded(true) ;
    addItem(PRODUCT_DATA);
  }

  useEffect(() => {
    items.length > 0 ? setIsAdded(true) : setIsAdded(false);
  }, [])

  if(!isHyderated) return  <Skeleton /> ;
  
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 pb-20 lg:pb-0 font-sans">
      
      <main className="max-w-350 mx-auto lg:p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4">
          
          {/* LEFT SIDE: Image Gallery & Desktop Actions */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 p-4 lg:p-6 lg:rounded-sm lg:shadow-sm">
            <ProductGallery images={PRODUCT_DATA.images} />
            
          </div>

          {/* RIGHT SIDE: Product Details */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 p-4 lg:p-8 lg:rounded-sm lg:shadow-sm">
            
            {/* Breadcrumbs */}
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 hidden lg:block">
              Home {'>'} Fabrics {'>'} Silk {'>'} Premium Blend
            </div>

            {/* Title & Ratings */}
            <h1 className="text-xl lg:text-2xl font-medium text-zinc-900 dark:text-zinc-100 mb-2">
              {PRODUCT_DATA.title}
            </h1>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                {PRODUCT_DATA.rating} <Star size={12} fill="currentColor" />
              </div>
              <span className="text-sm text-zinc-500 font-medium">
                {PRODUCT_DATA.reviews} Ratings & Reviews
              </span>
            </div>
            
            {/* Color Selector */}
            <div className='p-2 z-0'>
              <ColorSelector 
                colors={PRODUCT_DATA?.color } 
                selectedColor={selectedColor } 
                onSelectColor={handleColorSelect}
              />
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <p className="text-green-600 dark:text-green-400 text-sm font-bold mb-1">Special price</p>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-semibold text-zinc-900 dark:text-white">
                  {PRODUCT_DATA.price}
                </span>
                <span className="text-base text-zinc-500 line-through mb-1">
                  {PRODUCT_DATA.originalPrice}
                </span>
                <span className="text-base text-green-600 dark:text-green-400 font-bold mb-1">
                  30% off
                </span>
              </div>
            </div>

            {/* Details Table */}
            <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-6">
              <h3 className="text-lg font-medium mb-4 dark:text-white">Product Details</h3>
              <div className="grid grid-cols-3 gap-y-4 text-sm">
                <div className="text-zinc-500">Fabric</div>
                <div className="col-span-2 text-zinc-900 dark:text-zinc-200">Silk Blend</div>
                
                <div className="text-zinc-500">Pattern</div>
                <div className="col-span-2 text-zinc-900 dark:text-zinc-200">Solid / Woven</div>
                
                <div className="text-zinc-500">Width</div>
                <div className="col-span-2 text-zinc-900 dark:text-zinc-200">44 Inches</div>
                
                <div className="text-zinc-500">Description</div>
                <div className="col-span-2 text-zinc-900 dark:text-zinc-200 leading-relaxed">
                  {PRODUCT_DATA.description}
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-4 mt-6 px-4 lg:px-0">
              <button className="flex-1 h-14 bg-[#ffffff] text-black font-bold text-lg rounded flex items-center justify-center gap-2 hover:bg-[#ffffffa3]  transition-colors dark:border-0 border-2 border-[#f05f19]" 
                onClick={handleAddToCart}
              >
                <ShoppingCart size={22} />
                ADD TO CART
              </button>
              <motion.button
                onClick={handleAddToCart}
                disabled={isAdded}
                whileTap={{ scale: 0.95 }}
                className={`relative flex md:h-12 h-8  items-center justify-center overflow-hidden rounded-xl px-5  font-medium transition-all shadow-sm ${
                  isAdded 
                    ? "bg-emerald-600 text-white md:w-36  max-w-2/5" 
                    : "bg-stone-900 text-white hover:bg-red-900 md:w-32 w-6"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {!isAdded ? (
                    <motion.span
                      key="add"
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center text-[12px] gap-1 font-semibold tracking-wide"
                    >
                      <ShoppingCart className="size-4 stroke-2" />
                      <span className="hidden md:inline ">Add to Cart</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="added"
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5 text-xs font-semibold tracking-wide"
                    >
                      <Check className="md:h-4 md:w-4 h-1 w-1 stroke-3" />
                      Added!
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <button className="flex-1 h-14 bg-[#e20000] text-white font-bold text-lg rounded shadow flex items-center justify-center gap-2 hover:bg-[#e20000c9] hover:text-white transition-colors">
                <Zap size={22} fill="currentColor" />
                BUY NOW
              </button>
            </div>
          </div>
        </div>

        
      </main>
      <CardSlider />
      
    </div>
  );
}