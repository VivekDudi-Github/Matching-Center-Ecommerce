"use client";

import { Save, X } from "lucide-react";

export default function SaveBar() {
  return (
    <div className="sticky bottom-0 z-20 mt-8 border-zinc-200 bg-white/90 px-6 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
      <div className="mx-auto flex max-w-7xl items-center justify-end gap-3">
        <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-5 py-3 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
          <X size={18} />
          Cancel
        </button>

        <button className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
}