"use client";

import { Bell, Search, Moon, Sun } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-400  bg-white/80 backdrop-blur-md dark:border-zinc-400 dark:bg-zinc-900/80   ">
      <div className="flex h-16 items-center justify-between px-8">

        {/* Right */}

        <div className="ml-auto flex items-center gap-3">

          <button className="relative rounded-xl p-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="flex items-center gap-3 rounded-xl border border-zinc-200 px-3 py-2 dark:border-zinc-700">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white dark:bg-white dark:text-zinc-900">
              A
            </div>

            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                Admin
              </p>

              <p className="text-xs text-zinc-500">
                Store Owner
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}