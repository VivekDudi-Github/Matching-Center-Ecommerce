'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function ColorSelector({ colors, selectedColor, onSelectColor }) {
  return (
    <div className="space-y-4 -z-10" >
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
          <motion.button
            key={color.name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectColor(color)}
            className={` size-12 rounded-full border-2 transition-all ${
              selectedColor?.hex === color.hex 
                ? 'border-zinc-900 dark:border-white ring-2 ring-offset-2 ring-zinc-900 dark:ring-white dark:ring-offset-zinc-950' 
                : 'border-zinc-200 dark:border-zinc-700'
            }`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
            aria-label={`Select ${color.name}`}
          />
        ))}
      </div>
    </div>
  );
}

