"use client";
import { SkeletonBlock } from "@/app/hooks/SkeletonComp";
import { ShoppingBag } from "lucide-react";

function CheckSumSkeleton() {
  return (

    <div className="rounded-2xl border border-zinc-300 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}

      <div className="flex items-center gap-2 border-b border-zinc-200 p-4 dark:border-zinc-800">
        <SkeletonBlock className="w-30 h-10 rounded-md" />
      </div>

      <div className="p-4 flex justify-between ">
        <div className="flex items-start w-full justify-start">
          <SkeletonBlock className="size-26 rounded-lg" />
          <div className="w-1/5 h-full ml-2 space-y-2 ">
            <SkeletonBlock className="h-10 w-full" />
            <SkeletonBlock className="h-6 w-full" /> 
          </div>
        </div>
        <div className="w-1/12 h-full ml-2 space-y-2">
          <SkeletonBlock className="h-10 w-full" />
          <SkeletonBlock className="h-6 w-full" />
          <SkeletonBlock className="h-6 w-full" />
        </div>
      </div>
      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        <SkeletonBlock className="w-30 h-10 rounded-md " />
      </div>

      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">

        <div className="space-y-4  divide-zinc-200 dark:divide-zinc-800">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-7 w-full" />
          ))}
        </div>
      </div>


      
      
      <div className="p-4">
        <SkeletonBlock className="mt-6 flex h-12 w-full items-center justify-center rounded-xl" />
      </div>
    </div>
  )
}

export default CheckSumSkeleton