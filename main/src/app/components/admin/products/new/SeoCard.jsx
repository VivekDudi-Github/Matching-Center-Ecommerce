"use client";

import { Globe, Link2, FileSearch } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

export default function SEOCard() {
  const {register, control} = useFormContext();

  const product_Title = useWatch({
    name: "title",
    control,
    defaultValue: ""
  });

  const slug = useWatch({
    name: "slug",
    control,
    defaultValue: ""
  });
  const description = useWatch({
    name: "description",
    control,
    defaultValue: ""
  });

  const seo_title = useWatch({
    name: "seoTitle",
    control,
    defaultValue: ""
  });

  const seo_description = useWatch({
    name: "seoDescription",
    control,
    defaultValue: ""
  });

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}

      <div className="flex items-center gap-3 border-b border-zinc-200 p-6 dark:border-zinc-800">
        <div className="rounded-xl bg-zinc-100 p-2 dark:bg-zinc-800">
          <Globe className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            SEO Settings
          </h2>

          <p className="text-sm text-zinc-500">
            Improve how this product appears in search engines.
          </p>
        </div>
      </div>

      {/* Body */}

      <div className="space-y-6 p-6">
        {/* Meta Title */}

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Meta Title
            </label>

            <span className="text-xs text-zinc-500">
              Recommended: 50–60 characters
            </span>
          </div>

          <input {...register("seoTitle")}
            type="text"
            placeholder="Premium Cotton Fabric | Your Store"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>

        {/* Meta Description */}

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Meta Description
            </label>

            <span className="text-xs text-zinc-500">
              Recommended: 150–160 characters
            </span>
          </div>

          <textarea 
            {...register("seoDescription")}
            rows={4}
            placeholder="Premium quality cotton fabric available by the meter. Soft, durable, and ideal for shirts, dresses, and ethnic wear."
            className="w-full resize-none rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>

        {/* URL Slug */}

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            URL Slug
          </label>

          <div className="flex overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-700">
            <div className="flex items-center border-r border-zinc-300 bg-zinc-100 px-4 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800">
              /products/
            </div>

            <input
              value={slug}
              type="text"
              disabled 
              placeholder="premium-cotton-fabric"
              className="flex-1 bg-white px-4 py-3 outline-none dark:bg-zinc-950 dark:text-white"
            />
          </div>
        </div>

        {/* Search Preview */}

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-3 flex items-center gap-2">
            <FileSearch
              size={18}
              className="text-zinc-500"
            />

            <h3 className="font-medium text-zinc-900 dark:text-white">
              Google Search Preview
            </h3>
          </div>

          <div className="space-y-1">
            <p className="text-lg text-blue-700 dark:text-blue-400">
              {seo_title || product_Title || "Your Product"} | Matching Center
            </p>

            <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-500">
              <Link2 size={14} />
              https://matching-center.com/products/{slug}
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {(seo_description.length && seo_description)  || 
                (description.length && description) || 
              "Premium quality cotton fabric available by the meter. Soft, breathable and suitable for shirts, kurtas, dresses and more."}
            </p>
          </div>
        </div>

        {/* Note */}

        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            <strong>Tip:</strong> If you leave these fields empty, they can be
            automatically generated from the product name and description when
            the backend is implemented.
          </p>
        </div>
      </div>
    </section>
  );
}