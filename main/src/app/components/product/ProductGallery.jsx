import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductGallery({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const [showZoom, setShowZoom] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ backgroundPosition: '0% 0%' });
  const imageContainerRef = useRef(null);

  // Calculate mouse position relative to the image container
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomStyle({
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:sticky md:top-20 relative">
      
      {/* Thumbnails */}
      <div className="order-2 md:order-1 flex flex-row md:flex-col gap-2 overflow-auto w-full md:w-16 flex-shrink-0 md:max-h-[70vh] hide-scrollbar ">
        {images.map((imgUrl, index) => (
          <button
            key={index}
            onMouseEnter={() => setSelectedIndex(index)} 
            onClick={() => setSelectedIndex(index)}
            className={`relative flex-shrink-0 size-16 rounded border-2 transition-colors ${
              selectedIndex === index 
                ? 'border-blue-600 dark:border-blue-400' 
                : 'border-zinc-200 dark:border-zinc-800'
            }`}
          >
            <img 
              src={imgUrl} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-full h-full object-cover rounded-sm duration-200" 
            />
          </button>
        ))}
      </div>

      {/* Main Image View */}
      <div 
        ref={imageContainerRef}
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
        className="order-1 md:order-2 flex-1 relative w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded flex items-center justify-center p-2 lg:cursor-crosshair"
      >
        <div className="relative w-full h-[50vh] md:h-[70vh] max-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img 
                src={images[selectedIndex]} 
                alt="Main Product" 
                className="w-full h-full object-contain drop-shadow-sm pointer-events-none duration-200"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Zoom Portal (Desktop Only) */}

      {showZoom && (
        <div 
          className="hidden md:block absolute top-0 left-[calc(100%+4rem)] w-[146%] h-[105%] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-2xl rounded z-50 pointer-events-none"  
          style={{
            backgroundImage: `url(${images[selectedIndex]})`,
            backgroundPosition: zoomStyle.backgroundPosition,
            backgroundSize: '250%',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}
      
    </div>
  );
}