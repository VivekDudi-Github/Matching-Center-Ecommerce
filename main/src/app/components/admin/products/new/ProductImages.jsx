"use client";

import Image from "next/image";
import { ImagePlus, Trash2, Star, UploadCloud, CircleQuestionMarkIcon, CheckCircleIcon, CloudUpload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { toast } from "react-toastify";


export default function ProductImages( {allImages = [], setAllImages, uploadedImages = []}) {
  const inputRef = useRef(null);
  const {register, watch, setValue ,control, formState: { errors } } = useFormContext();

  const [selectedImage, setSelectedImage] = useState(null);
  const oldimages = useWatch({
    name: "alreadyUploaded",
    control,
    defaultValue: []
  });

  
  console.log("OLD IMAGES:", oldimages, selectedImage, allImages);

  const handleImageChange = (e) => {
    setSelectedImage(e);
  };

  const removeImage = (image) => {
    setAllImages( prev => {
      const arr = prev.filter((img, index) => index !== image.displayOrder);
      return arr.map((img, index) => ({
        ...img,
        displayOrder: index,
      }));
    });
  }

  const removeOldImage = (image) => {
    const restImages = oldimages.filter(img => img.publicId !== image.publicId);
    setValue("alreadyUploaded", restImages);
  }

 console.log(selectedImage);
 
  const addImage = (e) => {
    let files = e.target.files || [];
    
    files = [...files].filter(file => {
      const isBigger = file.size > 1024 * 1024 * 8 ;
      if(isBigger){ toast.error("Images must be less than 8 MB, file name: " + img.name);}
      const isIncuded = allImages.some(img => img.file.name === file.name && img.file.size === file.size && img.file.lastModified === file.lastModified);
      console.log(isIncuded, isBigger)
      return !isBigger && !isIncuded;
    });

    if (files.length > 0) {
      setAllImages(prev => {
        const newImages = [...prev, ...files];
        console.log("NEW IMAGES:", newImages);
        return newImages.map((image, index) => {
          return image?.file ? image : {
            file: image,
            displayOrder: index,
        }});
      });
    }
  };

  useEffect(() => {
    if(allImages.length > 0 ) {
      allImages.some((img) => img === selectedImage) || setSelectedImage(allImages[0]);
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
            src={selectedImage?.file ? URL.createObjectURL(selectedImage.file) : selectedImage?.url ? selectedImage.url : "/abc"}
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
          {allImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-xl border border-zinc-800 dark:border-zinc-500"
            >
              <Image
                src={image?.file ? URL.createObjectURL(image.file) : "/abc"}
                alt=""
                fill
                onClick={() => setSelectedImage(image)}
                className="object-cover transition duration-300 group-hover:scale-105"
              />

              {/* Overlay */}

              {uploadedImages.some(img => img.file.name === image.file.name) && (
                <span className="rounded-lg bg-white text-white p-1.5 shadow absolute bottom-2 right-2 transition hover:bg-zinc-100 dark:bg-black dark:hover:bg-zinc-700">
                    <CheckCircleIcon size={14}  />
                </span>
              )}

              <button type="button"
              onClick={() => removeImage(image)}
              className="rounded-lg bg-red-500 p-1.5 text-white shadow absolute bottom-2 left-2 transition hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
                <Trash2 size={14} />
              </button>
              
            </div>
          ))}
          {oldimages.length > 0 && 
            oldimages.map((image,index) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden rounded-xl border border-zinc-800 dark:border-zinc-500"
              >
                <Image
                  src={image?.url || "/abc"}
                  alt=""
                  fill
                  onClick={() => setSelectedImage(image)}
                  className="object-cover transition duration-300 group-hover:scale-105"
                />

                {/* Overlay */}

                <span className="rounded-lg bg-white text-white p-1.5 shadow absolute bottom-2 right-2 transition hover:bg-zinc-100 dark:bg-black dark:hover:bg-zinc-700">
                    <CheckCircleIcon size={14}  />
                </span>
                
                <button type="button"
                onClick={() => removeOldImage(image)}
                className="rounded-lg bg-red-500 p-1.5 text-white shadow absolute bottom-2 left-2 transition hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
                  <Trash2 size={14} />
                </button>
                
              </div>
            ))
          }
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
            PNG, JPG, WEBP up to 8 MB
          </p>

          <input
            ref={inputRef}
            onChange={addImage}
            type="file"
            accept="image/jpeg, image/png, image/webp"
            multiple
            hidden

          />
        </label>
        
        {uploadedImages.length > 0 && 
          <div className="">
            <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 p-6">
              <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-2">
                <CloudUpload className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Uploaded Images
                </h2>
                <p className="text-sm text-zinc-500">
                  Images that have been uploaded.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-3 sm:grid-cols-3 gap-3">
              {uploadedImages.map((image, index) => (
                  <div key={index} className="group relative aspect-square overflow-hidden rounded-xl border border-zinc-800 dark:border-zinc-500">
                    <Image
                      src={URL.createObjectURL(image.file)}
                      alt=""
                      fill
                      className="object-cover"
                    />
                    <p className="font-medium text-zinc-900 dark:text-white">
                      {image.file.name}
                    </p>
                  </div>
                ))
              }
            </div>
          </div>
        }

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
                <li>Upload at least one product image under 10 MB.</li>
                <li>Images will remain in the order you see now.</li>
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