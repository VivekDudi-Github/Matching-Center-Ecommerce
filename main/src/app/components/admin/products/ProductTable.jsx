"use client";

import { motion } from "framer-motion";
import { PackageOpen } from "lucide-react";

import ProductRow from "./ProductRow";
import ProductCard from "./ProductCard";
import ProductToolbar from "./ProductToolbar";
import { useEffect, useState } from "react";

const columns = [
  "Product",
  "Category",
  "Price / m",
  "Stock",
  "Featured",
  "Status",
  "Actions",
]


export default function ProductTable({ initalProducts = [], initialCursor = null }) {
  const [ products, setProducts] = useState([]);
  const [ cursor, ssetCursour] = useState(initialCursor);

  const loadMore = async() => {

  }

  useEffect(() => {
    setProducts(initalProducts);
  }, [initalProducts])

  return (
    <>
      
      {/* Toolbar */}
      <ProductToolbar />
 
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
          ) : (
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
        </div>
      </motion.div>

      {/* Mobile */}

      {/* <div className="space-y-4 hidden">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div> */}
    </>
  );
}