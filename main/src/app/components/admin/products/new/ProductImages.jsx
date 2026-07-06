"use client";

import Image from "next/image";
import { ImagePlus, Trash2, Star, UploadCloud } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800",
];

export default function ProductImages() {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-zinc-200 p-6 dark:border-zinc-800">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Product Images
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Upload high quality images of the fabric.
          </p>
        </div>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium dark:bg-zinc-800 dark:text-zinc-300">
          {images.length} Images
        </span>
      </div>

      <div className="space-y-6 p-6">
        {/* Main Preview */}

        <div className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950">
          <Image
            src={images[0]}
            alt="Product"
            fill
            className="object-cover"
          />

          <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            Main Image
          </div>
        </div>

        {/* Thumbnails */}

        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700"
            >
              <Image
                src={image}
                alt=""
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />

              {/* Overlay */}

              <div className="absolute inset-0 flex items-end justify-between bg-black/0 p-2 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                <button className="rounded-lg bg-white p-1.5 shadow">
                  <Star size={14} />
                </button>

                <button className="rounded-lg bg-red-500 p-1.5 text-white shadow">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Upload */}

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 p-10 transition hover:border-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-white dark:hover:bg-zinc-950">
          <UploadCloud
            size={42}
            className="mb-4 text-zinc-400"
          />

          <p className="font-medium text-zinc-900 dark:text-white">
            Click to upload images
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            PNG, JPG, WEBP up to 10 MB
          </p>

          <input
            type="file"
            multiple
            hidden
          />
        </label>

        {/* Tips */}

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
          <div className="flex items-start gap-3">
            <ImagePlus
              size={20}
              className="mt-0.5 text-blue-600"
            />

            <div className="space-y-1 text-sm">
              <p className="font-medium text-blue-700 dark:text-blue-300">
                Image Guidelines
              </p>

              <ul className="list-disc space-y-1 pl-5 text-blue-600 dark:text-blue-400">
                <li>Upload at least one product image.</li>
                <li>First image becomes the default customer image.</li>
                <li>Recommended size: 1200 × 1200 px.</li>
                <li>Use clear, well-lit fabric photos.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}