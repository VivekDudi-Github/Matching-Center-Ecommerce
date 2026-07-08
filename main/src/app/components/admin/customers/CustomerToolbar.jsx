"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

export default function CustomerToolbar() {
  const [search, setSearch] = useState("");

  const clearSearch = () => setSearch("");

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-1/2 text-zinc-400"
          />

          <input
            type="text"
            placeholder="Search by customer name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>

        {search && (
          <button
            onClick={clearSearch}
            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-300 px-4 py-3 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <X size={16} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}