"use client";

import { Save, Eye, Trash2, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import {AnimatePresence, motion} from 'framer-motion';
import { useFormContext, useWatch } from "react-hook-form";

export default function PublishCard() {
  const {handleSubmit, register, reset, control, formState: { errors } } = useFormContext();
  const [collapsed, setCollapsed] = useState(true);

  const status = useWatch({
    name: "isPublished",
    control,
    defaultValue: false
  });

  const featured = useWatch({
    name: "featured",
    control,
    defaultValue: false
  });

  const allImages = useWatch({
    name: "images",
    control,
    defaultValue: []
  })

  const toggleCollapse = () => setCollapsed( prev => !prev);
  
  return (
    <section className="sticky block bottom-4 rounded-2xl border border-zinc-500 bg-white dark:border-zinc-600 dark:bg-zinc-950">
      <div className="flex flex-col gap-6 p-6">
        {/* Summary */}

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Ready to Publish?
            </h2>
            <button type="button" onClick={toggleCollapse} className={`p-2 duration-200 rounded-md bg-black text-white dark:text-black dark:bg-white `}> 
              <ChevronDownIcon size={20} className={`${collapsed ? "rotate-180" : ""}`}/>  
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
                <div className="grid gap-4 md:grid-cols-3 grid-cols-2">
                <div className="rounded-xl border border-zinc-400/60 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="text-sm text-zinc-500">
                    Status
                  </p>

                  {status ? (
                    <p className="mt-2 font-semibold text-green-600">
                      Public
                    </p>
                  ) : (
                    <p className="mt-2 font-semibold text-amber-600">
                      Draft
                    </p>
                  )}
                </div>

                <div className="rounded-xl border border-zinc-400/60 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="text-sm text-zinc-500">
                    Featured
                  </p>

                  {featured ? (
                    <p className="mt-2 font-semibold text-cyan-500">
                      HomePage
                    </p>
                  ) : (
                    <p className="mt-2 font-semibold text-zinc-900 dark:text-amber-600">
                      Search
                    </p>
                  )}
                </div>

                <div className="rounded-xl border border-zinc-400/60 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="text-sm text-zinc-500">
                    Images
                  </p>

                  <p className="mt-2 font-semibold text-zinc-900 dark:text-white">
                    {allImages.length} Uploaded
                  </p>
                </div>
                </div>
                <div className={`flex flex-col-reverse gap-3 sm:flex-row sm:justify-end overflow-hidden duration-200` }> 
                  <button type="button" 
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-300 px-5 py-3 font-medium text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-500/10"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>

                  <button type="button" disabled
                    className="inline-flex items-center justify-center gap-2 rounded-xl border text-gray-700 cursor-not-allowed border-zinc-300 px-5 py-3 font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 "
                  >
                    <Eye size={18} />
                    Preview
                  </button>

                  <button 
                    type="submit" 
                    onClick={() => setCollapsed(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-400"
                  >
                    <Save size={18} />
                    Save Product
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
          
      </div>
    </section>
  );
}