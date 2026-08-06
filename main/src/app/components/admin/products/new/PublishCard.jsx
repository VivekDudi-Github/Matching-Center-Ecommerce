"use client";

import { Save, Eye, Trash2, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import {AnimatePresence, motion} from 'framer-motion';

export default function PublishCard() {
  
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed( prev => !prev);
  
  return (
    <section className="sticky block bottom-4 rounded-2xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-stone-950">
      <div className="flex flex-col gap-6 p-6">
        {/* Summary */}

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Ready to Publish?
            </h2>
            <button onClick={toggleCollapse} className={`p-2 duration-200 ${collapsed ? "rotate-180" : ""}`}>
              <ChevronDownIcon size={20} /> 
            </button>
          </div>

          <p className="mt-1 text-sm text-zinc-500">
            Review your product information before saving it to the catalogue.
          </p>
        </div>

        {/* Status */}
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-6">
                <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="text-sm text-zinc-500">
                    Status
                  </p>

                  <p className="mt-2 font-semibold text-amber-600">
                    Draft
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="text-sm text-zinc-500">
                    Visibility
                  </p>

                  <p className="mt-2 font-semibold text-zinc-900 dark:text-white">
                    Public
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="text-sm text-zinc-500">
                    Images
                  </p>

                  <p className="mt-2 font-semibold text-zinc-900 dark:text-white">
                    0 Uploaded
                  </p>
                </div>
                </div>
                <div className={`flex flex-col-reverse gap-3 sm:flex-row sm:justify-end overflow-hidden duration-200` }> 
                  <button
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-300 px-5 py-3 font-medium text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-500/10"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>

                  <button
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 px-5 py-3 font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                  >
                    <Eye size={18} />
                    Preview
                  </button>

                  <button
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                  >
                    <Save size={18} />
                    Save Product
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
          

        {/* Buttons */}


      </div>
    </section>
  );
}