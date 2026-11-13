"use client";

import { motion } from "framer-motion";
import { ArrowDown, Loader2Icon, ShoppingBag } from "lucide-react";

import OrderRow from "./OrderRow";
import OrderCard from "./OrderCard";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { api } from "@/app/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function OrdersTable({ initialOrders = [], initialCursor, errorMsg }) {
  const params = useSearchParams();
  let status = params.get("status") ?? "";
  let search = params.get("search") ?? "";

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [search, status],

    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();
      if (pageParam) {
        params.set("cursor", pageParam.cursor);
      }      
      params.set("search", search);{{
      params.set("status", status);}}
      status = !status ? "All" : status;

      const res = await api.get(`/admin/order/?${params}`);
      return res.data;
    },

    initialPageParam: null,
    enabled: Boolean(initialOrders?.length),
    initialData: initialOrders?.length
      ? {
          pages: [{list: initialOrders,newCursor : initialCursor}],
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
  const orders = data?.pages?.flatMap((page) => page?.list) ?? [];

  useEffect(() => {
    console.log("errorMsg", errorMsg);
    if(errorMsg){
      toast.error(errorMsg);
    }
  }, [errorMsg])
  
  
  if (!orders.length) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-16 text-center dark:border-zinc-700 dark:bg-zinc-900">
        <ShoppingBag
          size={60}
          className="mx-auto mb-4 text-zinc-400"
        />

        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
          No Orders Found
        </h2>

        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Orders will appear here once customers start placing them.
        </p>
      </div>
    );
  };
  return (
    <>
      {/* Desktop */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className=" rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50 md:block hidden"
      >
        <div className="overflow-auto grid grid-cols-1 gap-6 ">
          <table className="min-w-full">
            <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Order
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Amount
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Payment
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Date
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className=" divide-y divide-x divide-zinc-800 dark:divide-zinc-100">
              {orders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                />
              ))}
            </tbody>
          </table>

        </div>
      </motion.div>

      {/* Mobile */}

      <div className="space-y-4 md:hidden">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))}
      </div>

      {hasNextPage && (
          <div className="flex justify-center m-4">
            <button
              type="button"
              disabled={isFetchingNextPage }
              onClick={loadMore}
              className="inline-flex items-center text-sm p-2 justify-center gap-2 rounded-lg border  text-white dark:text-black  border-zinc-300 px-3 py-2 bg-black dark:bg-white font-medium  transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-300 hover:cursor-pointer "  
            >
              
            {isFetchingNextPage ? 
              <Loader2Icon className="animate-spin duration-75 " size={18} />
              : <ArrowDown size={18} /> }
              Load More
            </button>
          </div>
        )}
    </>
  );
}