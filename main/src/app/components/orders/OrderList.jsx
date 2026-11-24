"use client";

import { motion } from "framer-motion";
import { PackageOpen } from "lucide-react";
import OrderCard from "./OrderCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/app/lib/axios";
import OrderCardSkeleton from "./skeleton/OrderCardSkeleton";

export default function OrdersList({ initialOrders = [], initialCursor }) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["all-orders"],
    queryFn: async ({ pageParam }) => {
      const query = new URLSearchParams();
      if (pageParam) {
        query.set("cursor", pageParam);
      }
      const res = await api.get(`/order?${query}`);
      return res.data;
    },
    initialPageParam: null,
    initialData: initialOrders?.length
      ? {
          pages: [{ orders: initialOrders, cursor: initialCursor }],
          pageParams: [null],
        }
      : undefined,
    getNextPageParam: (lastPage) => lastPage?.cursor || undefined,
  });

  const orders = data?.pages?.flatMap((page) => page?.orders) ?? [];

  if (!orders?.length && !isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white px-6 text-center dark:border-zinc-800 dark:bg-zinc-950"
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
          <PackageOpen size={26} />
        </div>

        <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
          No orders yet
        </h3>

        <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
          You haven't placed any orders yet. Your orders will appear here once
          you make a purchase.
        </p>
      </motion.div>
    );
  }

  const fetchMore = async (idx) => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="space-y-4"
    >
      {orders.map((order, idx) => (
        <motion.div
          onViewportEnter={ idx === orders?.length-1 ? () => fetchMore(idx) : null }
          key={order.id}
          variants={{
            hidden: {
              opacity: 0,
              y: 12,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
              },
            },
          }}
        >
          <OrderCard order={order} />
        </motion.div>
      ))}
      {isFetchingNextPage ? Array.from({length: 4}, (_, i) => <OrderCardSkeleton key={i} />) : null}
      
    </motion.div>
  );
}