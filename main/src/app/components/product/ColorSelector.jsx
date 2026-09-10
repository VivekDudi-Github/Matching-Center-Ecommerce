'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { InfoIcon } from 'lucide-react';

export default function ColorSelector({ colors, selectedColor, onSelectColor }) {
  useEffect(() => {
    if(!selectedColor && colors?.length){
      onSelectColor(colors[0]);
    }
  },[selectedColor])

  return (
    <div className="space-y-3 -z-10" >
      <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex flex-col">
        <span>
          Color: {selectedColor && <span className="text-zinc-500 dark:text-zinc-400">{selectedColor?.name} {`(${selectedColor?.hex})`}</span>}
        </span>
        <span>
          Available Meters: {selectedColor && <span className="text-zinc-500 dark:text-zinc-400">{selectedColor?.availableMeters} meters</span>}
        </span>
       </h3>
      <div className="flex items-center gap-3 flex-wrap">
        {colors.map((color) => (
          <div key={color.id}>
            {color.isLowStock ? 
              (color.availableMeters == 0 ? (
                 
                  <div className='relative hover:cursor-not-allowed z-0'>
                  <motion.button
                    disabled={color.availableMeters === 0}
                    className={` size-12 rounded-full border-2 transition-all 'border-zinc-600 dark:border-zinc-400 `}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={`Select ${color.name}`}
                  />
                  <div className=' absolute h-1 bg-black top-1/2 opacity-50 -translate-y-1.25 w-full    ring-zinc-900  -rotate-45 rounded-sm  '/>
                </div> 
                ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectColor(color)}
                  className={` size-12 rounded-full border-2 transition-all ${
                    selectedColor?.hex === color.hex 
                      ? 'border-zinc-900 dark:border-white ring-2 ring-offset-2 ring-zinc-900 dark:ring-white dark:ring-offset-zinc-950' 
                      : 'border-red-700 dark:border-red-700'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                />
              )) : 
            <motion.button
              disabled={color.availableMeters === 0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectColor(color)}
              className={` size-12 rounded-full border-2 transition-all ${
                selectedColor?.hex === color.hex 
                  ? 'border-zinc-900 dark:border-white ring-2 ring-offset-2 ring-zinc-900 dark:ring-white dark:ring-offset-zinc-950' 
                  : 'border-zinc-600 dark:border-zinc-400'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              aria-label={`Select ${color.name}`}
            />}
          </div>
        ))}
      </div>
      <div className='text-zinc-500 flex items-center gap-1'>
        <InfoIcon size={19}   />
         You can adjust the item measurements by adding to the cart.
      </div>
    </div>
  );
}

