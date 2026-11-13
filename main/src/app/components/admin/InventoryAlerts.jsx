
"use client";

import { api } from "@/app/lib/axios";
import { moreInventryAlerts } from "@/app/lib/controller/admin/getAdminDash";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowDown, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function InventoryAlerts({initialAlerts , initalCursor}) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["inventory-alerts"],

    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();
      if (pageParam) {
        params.set("cursor", pageParam);
      }
      const res = await api.get(`/admin/dash/inventory-alerts/?${params}`);
      return res.data;
    },

    initialPageParam: null,
    enabled: Boolean(initialAlerts),
    initialData: initialAlerts
      ? {
          pages: [{alerts: initialAlerts,newCursor : initalCursor}],
          pageParams: [],
        }
      : undefined,
   
    staleTime: 60 * 1000, 
    

    getNextPageParam: (lastPage) =>
      lastPage?.newCursor
        ? lastPage?.newCursor
        : undefined,
  });


  const loadMore = async( ) => {
    if(!isFetchingNextPage && !hasNextPage){
      await fetchNextPage()
    } 
  }
  const items = data?.pages?.flatMap((page) => page?.alerts) ?? [];



  return (
    <motion.div
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-center gap-2 border-b border-zinc-200 p-6 dark:border-zinc-800">
        <AlertTriangle className="text-orange-500" />

        <div>
          <h2 className="text-lg font-semibold">
            Inventory Alerts
          </h2>

          <p className="text-sm text-zinc-500">
            Products running low
          </p>
        </div>
      </div>

      <div className="space-y-3 p-5">
        {items?.map((item) => (
          <Link href={"/admin/products/"+item?.product?.id+"/edit" } key={item?.id}>
            <div
              key={item?.id}
              className="rounded-xl border border-zinc-200 p-4 transition hover:border-orange-300 hover:bg-orange-50 dark:border-zinc-800 dark:hover:border-orange-700 dark:hover:bg-orange-500/5"
            >
              <p className="font-medium">
                {item?.name}
                <span className={`rounded-full ml-2 bg-red-100 px-3 py-1 text-xs font-semibold text-black dark:bg-${item?.hex} `}>
                  {item?.hex} 
                </span>
              </p> 

              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-zinc-500">
                  Remaining
                </span>

                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600 dark:bg-red-500/15 dark:text-red-400">
                  {item?.availableMeters} m
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    {hasNextPage && (
        <div className="flex justify-center m-4">
          <button
            type="button"
            disabled={isLoading}
            onClick={loadMore}
            className="inline-flex items-center text-sm p-2 justify-center gap-2 rounded-lg border  text-white dark:text-black  border-zinc-300 px-3 py-2 bg-black dark:bg-white font-medium  transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-300 hover:cursor-pointer "  
          >
            
            {isLoading ? 
            <Loader2Icon className="animate-spin duration-75 " size={18} />
            : <ArrowDown size={18} /> }
            Load More
          </button>
        </div>
      )}
    </motion.div>
  );
}