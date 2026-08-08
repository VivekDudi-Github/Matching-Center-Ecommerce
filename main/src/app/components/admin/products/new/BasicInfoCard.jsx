"use client";

import { Tag, Package, Trash2Icon, FileTextIcon } from "lucide-react";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export default function BasicInfoCard() {
  const [tagInput, setTagInput] = useState("");

  const {register, watch, setValue ,control, formState: { errors } } = useFormContext();

  const tags = useWatch({
    name: "tags",
    control,
    defaultValue: []
  });

  const handleTagsChange = () => {
    if(tagInput.trim() !== "") {

      tags.some(tag => tag.toLowerCase() === tagInput.toLowerCase()) 
        ? null : setValue("tags", [...tags, tagInput.trim()]);
  }};

  const handleTagsDelete = (tag) => {
    setValue("tags", tags.filter(t => t !== tag));
  };

  

  return (
    <section className="rounded-2xl bg-white shadow-sm shadow-black/40 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"> 
      <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 p-6">
        <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-2">
          <Package className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Basic Information
          </h2>
          <p className="text-sm text-zinc-500">
            General details about the product.
          </p>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {/* Product Name */}

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Product Name
          </label>

          <input 
            {...register("title")}
            type="text"
            placeholder="Premium Cotton Fabric"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>

        {/* Category */}

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Category
          </label>

          <select 
            {...register("category")}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white">
            <option>Cotton</option>
            <option>Silk</option>
            <option>Linen</option>
            <option>Rayon</option>
            <option>Polyester</option>
          </select>
        </div>

        {/* SKU */}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              SKU
            </label>

            <input
              {...register("sku")}
              placeholder="FAB-001"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Slug
            </label>

            <input 
              {...register("slug")} 
              placeholder="premium-cotton-fabric"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>
        </div>

        {/* Tags */}

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Tags
          </label>

          <div className="flex flex-wrap gap-3">
            <input 
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Summer  Wear"
              className="max-w-[80%] w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
            <button type="button"
              onClick={() => handleTagsChange(tagInput)}
              className="rounded-lg bg-zinc-900 px-6 py-1 font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Add Tag
            </button>
          </div>

          <div className="pt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              >
                {tag}
                <button type="button"
                  onClick={() => handleTagsDelete(tag)}
                  className="rounded-lg bg-red-500 p-1.5 text-white shadow transition hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                >
                  <Trash2Icon size={14} />
                </button>
              </span>
            ))}
          </div>

        </div>
        
        {/* Status */}
         <div className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <FileTextIcon className="text-amber-500" />

            <div>
              <p className="font-medium text-zinc-900 dark:text-white">
                Publishing Now
              </p>

              <p className="text-sm text-zinc-500">
                Save as draft or publish the product to make it live.
              </p>
            </div>
          </div>

          <input 
          {...register("isPublished")}
            type="checkbox"
            className="h-5 w-5 accent-zinc-900"
          />
        </div>

        {/* Featured */}

        <div className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <Tag className="text-amber-500" />

            <div>
              <p className="font-medium text-zinc-900 dark:text-white">
                Featured Product
              </p>

              <p className="text-sm text-zinc-500">
                Show this product on the homepage.
              </p>
            </div>
          </div>

          <input 
          {...register("featured")}
            type="checkbox"
            className="h-5 w-5 accent-zinc-900"
          />
        </div>
      </div>
    </section>
  );
}