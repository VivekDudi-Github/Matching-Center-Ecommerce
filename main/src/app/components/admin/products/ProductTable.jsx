"use client";

import { motion } from "framer-motion";
import { ArrowDown, Loader2Icon, PackageOpen } from "lucide-react";

import ProductRow from "./ProductRow";
import ProductCard from "./ProductCard";
import ProductToolbar from "./ProductToolbar";
import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "@/app/lib/axios";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import TableLoading from "./TrSkeleton";
import { useEffect } from "react";

const columns = [
  "Product",
  "Category",
  "Price / m",
  "Stock",
  "Featured",
  "Status",
  "Actions",
]


export default function ProductTable({ initalProducts = [], initialCursor = null, errorMsg }) {
  const params = useSearchParams();
  const search = params.get("search") ?? "";
  const category = params.get("category") ?? "";
  const status = params.get("status") ?? "";

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["admin-products", search, category, status],
    queryFn: async ({ pageParam }) => {
      const query = new URLSearchParams();
      if (pageParam) {
        query.set("cursor", pageParam);
      }
      query.set("search", search);
      query.set("category", category);
      query.set("status", status);
      const res = await api.get(`/admin/products?${query}`);
      return res.data;
    },
    initialPageParam: null,
    initialData: initalProducts?.length
      ? {
          pages: [{ list: initalProducts, newCursor: initialCursor }],
          pageParams: [null],
        }
      : undefined,
    getNextPageParam: (lastPage) => lastPage?.newCursor || undefined,
  });

  const products = data?.pages?.flatMap((page) => page?.list) ?? [];
  const cursor = data?.pages?.[data.pages.length - 1]?.newCursor || null;

  const loadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  }

  const loadInitial = async () => {
    await fetchNextPage();
  }

  useEffect(() => {
    console.log("errorMsg", errorMsg);
    if(errorMsg){
      toast.error(errorMsg);
    }
  }, [errorMsg])

  return (
    <>
      
      {/* Toolbar */}
      <ProductToolbar loadInitial={loadInitial} />
 
      {/* Desktop */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className=" rounded-2xl border border-zinc-200 bg-white shadow-sm sm:block dark:border-zinc-800 dark:bg-zinc-900 w-full"
      >


        <div className="overflow-x-auto block">
          {products.length ? (
            <table className="min-w-full relative">
              <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className={`md:px-6 md:py-4 p-2 text-left md:text-sm text-[9px] font-semibold uppercase tracking-wider text-zinc-500 ${column === "Category" ? "md:block hidden" : ""}`}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>


              <tbody>
                {products.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                  />
                ))}
              </tbody>
            </table>
          ) : null}
          { !products.length && !isLoading &&  (
            <div className="rounded-2xl top-0 left-0 border  border-zinc-400 bg-white p-16 text-center dark:border-black dark:bg-black"> 
              <PackageOpen
                size={60}
                className="mx-auto mb-5 text-zinc-400"
              />

              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                No Products Found
              </h2>

              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                Add your first product to start selling.
              </p>
            </div>
          )}

          <TableLoading isLoading={isFetchingNextPage} />

          {hasNextPage && (
            <div className="flex justify-center m-4">
              <button
                type="button"
                disabled={isFetchingNextPage}
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
        </div>
      </motion.div>

    </>
  );
}