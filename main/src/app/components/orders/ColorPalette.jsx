"use client";
import React from 'react'
import { Ruler } from "lucide-react";

export default function ColorPalette({color, index}) {
  return (
    <div
      className="flex items-center gap-2 rounded-lg border border-zinc-400 bg-zinc-50 px-2.5 py-1.5 dark:border-zinc-700 dark:bg-zinc-900"
    >
      {/* Color */}
      <span
        className="h-4 w-4 shrink-0 rounded-full border border-zinc-300 dark:border-zinc-600"
        style={{
          backgroundColor: color.hex || "#e4e4e7",
        }}
      />

      {/* Color name */}
      <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
        {color.colorName}
      </span>

      {/* Ordered meters */}
      <span className="flex items-center gap-1 border-l border-zinc-200 pl-2 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        <Ruler size={12} />
        {Number(color.quantity).toFixed(2)} m
      </span>
    </div>
  )
}
