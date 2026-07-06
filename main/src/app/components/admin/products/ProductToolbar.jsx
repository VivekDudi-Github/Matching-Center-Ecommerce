"use client";

import Link from "next/link";
import { Search, Plus, Filter, X } from "lucide-react";
import { useState } from "react";

const categories = [
  "All Categories",
  "Cotton",
  "Linen",
  "Silk",
  "Rayon",
  "Polyester",
];

const statusOptions = [
  "All Status",
  "Active",
  "Low Stock",
  "Out of Stock",
];

export default function ProductToolbar() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");

  const hasFilters =
    search ||
    category !== "All Categories" ||
    status !== "All Status";

  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setStatus("All Status");
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
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
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
            />
          </div>

          {/* Category */}

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          {/* Status */}

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          >
            {statusOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          {/* Clear */}

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 rounded-xl border border-zinc-300 px-4 py-3 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <X size={16} />
              Clear
            </button>
          )}
        </div>

        {/* Right */}

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Active Filters */}

      {hasFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <Filter size={15} />
            Active Filters:
          </div>

          {search && (
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium dark:bg-zinc-800">
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