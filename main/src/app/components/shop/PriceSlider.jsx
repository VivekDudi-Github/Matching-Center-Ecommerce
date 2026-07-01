import React from "react";
import * as Slider from "@radix-ui/react-slider";

export default function PriceSlider({ min, max, step, value, onValueChange }) {
  return (
    <Slider.Root
      className="relative flex items-center select-none touch-none w-full h-5"
      value={value}
      max={max}
      min={min}
      step={step}
      onValueChange={onValueChange}
    >
      {/* The background track */}
      <Slider.Track className="relative h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full grow">
        {/* The active filled section between the thumbs */}
        <Slider.Range className="absolute h-full bg-black dark:bg-white rounded-full" />
      </Slider.Track>
      
      <Slider.Thumb 
        className="block w-4 h-4 bg-white border-2 border-black dark:border-white rounded-full shadow cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600" 
        aria-label="Minimum Price" 
      />

      <Slider.Thumb 
        className="block w-4 h-4 bg-white border-2 border-black dark:border-white rounded-full shadow cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600" 
        aria-label="Maximum Price" 
      />
    </Slider.Root>
  );
}