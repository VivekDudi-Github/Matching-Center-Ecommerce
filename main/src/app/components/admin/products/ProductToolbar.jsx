"use client";

import Link from "next/link";
import { Search, Plus, Filter, X, ScanSearchIcon } from "lucide-react";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";


const categories = [
  { label: "All Categories", value: "" },
  { label: "Cotton", value: "cotton" },
  { label: "Linen", value: "linen" },
  { label: "Silk", value: "silk" },
  { label: "Rayon", value: "rayon" },
  { label: "Polyester", value: "polyester" },
];

const statusOptions = [
  { label: "All Status", value: "" },
  { label: "Active", value: "active" },
  { label: "Low Stock", value: "low-stock" },
  { label: "Out of Stock", value: "out-of-stock" },
];

export default function ProductToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") ?? ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") ?? "All Categories"
  );

  const [status, setStatus] = useState(
    searchParams.get("status") ?? "All Status"
  );


  const hasFilters =
    search ||
    category !== "All Categories" ||
    status !== "All Status";

  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setStatus("All Status");

    router.push("/admin/products");
  };

  const updateUrl = (newSearch, newCategory, newStatus) => {
    const params = new URLSearchParams();

    if (newSearch) {
      params.set("search", newSearch);
    }

    if (newCategory !== "All Categories") {
      params.set("category", newCategory);
    }

    if (newStatus !== "All Status") {
      params.set("status", newStatus);
    }

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="rounded-2xl border-zinc-200 bg-white sm:p-4 p-2 duration-200 shadow-sm  dark:bg-black">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div className="flex flex-1 flex-col gap-3 lg:flex-row">
          {/* Search */}

          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);

                updateUrl(value, category, status);
              }}
              className="w-full rounded-lg border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
            />
            <button className="lg:hidden absolute h-[45.6px] top-0 right-0 items-center duration-200 justify-center gap-2 border dark:border-black border-white rounded-lg bg-zinc-900 p-2  text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200" > 
              <ScanSearchIcon size={29} />
            </button>
          </div>
          
          <button className="lg:inline-flex hidden  items-center duration-200 justify-center gap-2 border dark:border-black border-white rounded-lg bg-zinc-900 p-2  text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200" > 
            <ScanSearchIcon size={29} />
          </button>

          <div className="grid grid-cols-2 gap-2 ">
            {/* Category */}

            <select
              value={category}
              onChange={(e) => {
                const value = e.target.value;
                setCategory(value);

                updateUrl(search, value, status);
              }}
              className="rounded-lg  border col-span-1 border-zinc-300 bg-white px-2 py-2 text-sm outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
            >
              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            {/* Status */}

            <select
              value={status}
              onChange={(e) => {
                const value = e.target.value;
                setStatus(value);

                updateUrl(search, category, value);
              }}
              className="rounded-lg col-span-1 border border-zinc-300 bg-white p-2 text-sm outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
            >
              {statusOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear */}

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="hidden md:flex items-center justify-center gap-2 rounded-xl border border-zinc-300 px-4 py-3 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <X size={16} />
              Clear
            </button>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {hasFilters && <button
            onClick={clearFilters}
            className="md:hidden flex items-center  justify-center gap-2 rounded-lg border border-zinc-300 p-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <X size={16} />
            Clear
          </button>}
          <Link
            href="/admin/products/new"
            className="inline-flex items-center w-full duration-200 justify-center gap-2 rounded-lg bg-zinc-900 p-2  text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200" 
          >
            <Plus size={18} />
            Add Product
          </Link>

        </div>
      </div>

      {/* Active Filters */}

      {hasFilters && (
        <div className ="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <Filter size={15} />
            Active Filters:
          </div>

          {search && (
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium dark:bg-zinc-800 text-wrap max-w-fit overflow-auto">
              "{search}"
            </span>
          )}

          {category !== "All Categories" && (
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium dark:bg-zinc-800">
              {category}
            </span>
          )}

          {status !== "All Status" && (
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium dark:bg-zinc-800">
              {status}
            </span>
          )}
        </div>
      )}
    </div>
  );
}