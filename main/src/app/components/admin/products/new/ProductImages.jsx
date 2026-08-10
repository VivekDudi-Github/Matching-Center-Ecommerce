"use client";

import Image from "next/image";
import { ImagePlus, Trash2, Star, UploadCloud, CircleQuestionMarkIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

const images = [
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800",
];

export default function ProductImages( {allImages = [], setAllImages}) {
  const inputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [displayOrder, setDisplayOrder] = useState(1);


  // const [allImages, setAllImages] = useState([]);

  const handleImageChange = (e) => {
    setSelectedImage(e);
  };

  const removeImage = (image) => {
    setAllImages( prev => prev.filter((img) => img !== image));
  }

  const changeOrder = (newOrder) => {
    if(allImages.length < 2) return;

    const image = allImages[selectedImage];
    setAllImages(prev => {
      const newImages = [...prev];
      const index = newImages.findIndex(img => img.displayOrder === image.displayOrder);
      newImages.splice(index, 1);
      newImages.splice(newOrder - 1, 0, image);
      return newImages;
    });
  }

  const addImage = (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      setAllImages(prev => {
        const newImages = [...prev, ...files];
        return newImages.map((image, index) => ({
          file: image,
          displayOrder: index + 1,
          index: index,
        }));
      });
    }
  };

  useEffect(() => {
    if(allImages.length > 0 ) {
      allImages.some((img) => img?.displayOrder === selectedImage) || setSelectedImage(1);
    } else {
      setSelectedImage(null);
    }
  }, [allImages]);

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
          {allImages.length} Images
        </span>
      </div>

      <div className="space-y-6 sm:p-6 p-2">
        {/* Main Preview */}

        <div className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950">
          {selectedImage ? (
            <Image
            src={URL.createObjectURL(allImages.filter(img => img.displayOrder === selectedImage)[0].file)}
            alt="Product"
            fill
            className="object-cover"
          />
          ) : (
            <div className=" w-full p-4 h-full text-center">No Image Selected</div> 
          )}

          {selectedImage && <div className="absolute right-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            Current Image
          </div>}
        </div>

        {/* Thumbnails */}

        <div className="grid md:grid-cols-3 grid-cols-3 sm:grid-cols-3 gap-3">
          {allImages.sort((a, b) => a.displayOrder - b.displayOrder).map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-xl border border-zinc-800 dark:border-zinc-500"
            >
              <Image
                src={URL.createObjectURL(image.file)}
                alt=""
                fill
                onClick={() => setSelectedImage(image.displayOrder)}
                className="object-cover transition duration-300 group-hover:scale-105"
              />

              {/* Overlay */}

              {/* <button className="rounded-lg bg-white text-white p-1.5 shadow absolute bottom-2 right-2 transition hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                  <Star size={14} />
              </button> */}

              <button 
              onClick={() => removeImage(image)}
              className="rounded-lg bg-red-500 p-1.5 text-white shadow absolute bottom-2 left-2 transition hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
                <Trash2 size={14} />
              </button>
              
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="mb-2 col-span-2 text-lg font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
            Select position
            <CircleQuestionMarkIcon size={14} className="text-zinc-500 dark:text-zinc-400" 
              onClick={() => toast.info("Selected Image will replace the image with entered position")}
            />
          </label>

          <input 
            onClick={(e) => setDisplayOrder(e.target.value)}
            type="number"
            min={1}
            max={allImages.length}
            placeholder="1"
            className="w-full rounded-xl border border-zinc-500 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
          <button type="button"
            disabled={allImages.length < 2}
            onClick={() => changeOrder(displayOrder)}
            className="rounded-lg bg-zinc-900 px-6 py-1 font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 disabled:opacity-40 dark:hover:bg-zinc-200"
          >
            Change Order
          </button>
        </div>


        {/* Upload */}

        <label 
          onClick={() => inputRef?.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 p-10 transition hover:border-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-white dark:hover:bg-zinc-950"
          >
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
            ref={inputRef}
            onChange={addImage}
            type="file"
            accept="image/*"
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