"use client";

import { useRef, useState } from "react";
import { ScanSearchIcon, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const statusOptions = [
  "All",
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Cancel Requested",
];

export default function OrderToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  

  const [search, setSearch] = useState(
    searchParams.get("search") ?? ""
  );

  const [status, setStatus] = useState(
    searchParams.get("status") ?? "All"
  );


  const clearFilters = () => {
    setSearch("");
    setStatus("All");
  };

  const hasFilters = search || status !== "All";

  const updateUrl = () => {
    const params = new URLSearchParams();
    
    if (status !== "All") {
      params.set("status", status);
    }

    if (search.length) {
      params.set("search", search);
    }


    router.push(`?${params.toString()}`);
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/50">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {/* Search */}

          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              type="text"
              placeholder="Search id,customer.."
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);
              }}
              className="w-full rounded-lg border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
            />
            <button onClick={updateUrl} className="lg:hidden absolute h-[45.6px] top-0 right-0 items-center duration-200 justify-center gap-2 border dark:border-black border-white rounded-lg active:scale-90 bg-zinc-900 p-2  text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200" > 
              <ScanSearchIcon size={29} />
            </button>
          </div>
          
          <button onClick={updateUrl} className="lg:inline-flex hidden  items-center duration-200 justify-center gap-2 border dark:border-black border-white rounded-lg bg-zinc-900 p-2 active:scale-90  text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200" > 
            <ScanSearchIcon size={29} />
          </button>

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
    </div>
  );
}