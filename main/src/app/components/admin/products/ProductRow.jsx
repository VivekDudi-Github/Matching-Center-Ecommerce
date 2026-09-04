"use client";

import Image from "next/image";
import { color, motion } from "framer-motion";
import {
  Eye,
  Pencil,
  Trash2,
  Star,
  LoaderIcon,
} from "lucide-react";
import ActionMenu from "./ActionMenu";
import { useEffect, useState } from "react";
import { array } from "zod";
import {deleteProductAction, duplicateProductAction, revertDeleteProductAction} from '@/app/lib/actions/newProduct.action';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function ProductRow({ product }) {
  const {
    images,
    title,
    category,
    price,
    color,
    featured,
  } = product;
  const router = useRouter();

  const [sortedColors, setSortedColors] = useState([]);
  const [sortedImages, setSortedImages] = useState([]);
  const [selectedImageIdx , setSelectedImageIdx] = useState(0);

  const [isDeleted , setIsDeleted] = useState(false);
  
  const [isChangingImg, setIsChaningImg] = useState(false);
  const [duplicateLoading, setDuplicateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);


  useEffect(() => {
    const colorArr = [...color];
    colorArr.sort((a, b) => a.availableMeters - b.availableMeters);
    setSortedColors(colorArr);

    if(images.length > 0) {
      const sortedImages = images.sort((a, b) => a.displayOrder - b.displayOrder);
      setSortedImages(sortedImages ?? []);
    }

  }, [color, images])

  const stockColor = () => {
    const stock = sortedColors?.[0]?.availableMeters || 0;
    return stock <= 0
          ? "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
          : stock <= 20
          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400"
          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400";
  }

  const stockLabel = () => {
    const stock = sortedColors?.[0]?.availableMeters || 0;
    return stock <= 0
          ? "Out of Stock"
          : stock <= 20
          ? "Low Stock"
          : "In Stock";
  }

  const duplicateProduct = async(id) => {
    try {
      setDuplicateLoading(true);
      const clonedProduct = await duplicateProductAction(id);
      if(!clonedProduct) throw new Error("Failed to duplicate product");


      router.push(`/admin/products/${clonedProduct.id}/edit`);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setDuplicateLoading(false);
    }
  }

  const deleteProduct = async(id) => {
    try {
      await deleteProductAction(id);
      setIsDeleted(true);
    }catch (error) {
      console.log("error in deleting the product");
      toast.error(error?.message || "Something went wrong");
    }
  }

  const revertDelete = async(id) => {
    setDeleteLoading(true);
    try {
      await revertDeleteProductAction(id);
      setIsDeleted(false);
    }catch (error) {
      console.log("error in deleting the product");
      toast.error(error?.message || "Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  }

  const transformedImageUrl = (transformation) => {
    if(!sortedImages[selectedImageIdx]?.url) return "";
    let url = sortedImages[selectedImageIdx]?.url;

    url = url.replace("/upload/", `/upload/${transformation}/`);
    return url;
  }

  useEffect(() => {
    setIsChaningImg(true);
  }, [selectedImageIdx, sortedImages])

  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{
        backgroundColor: "rgba(0,0,0,0.2)",
      }}
      className="border-b border-zinc-100 dark:border-zinc-800 relative"
    >
      {/* Product */}
      <td className="sm:px-6 sm:py-5 p-2 ">

        {duplicateLoading && 
          <div className="absolute top-0 left-0 h-full w-full bg-black z-20 text-white animate-pulse opacity-100 duration-500 text-center flex items-center justify-center text-sm font-semibold rounded-lg" >
            Duplicating Product...
          </div>
        }
        {isDeleted && 
          <div className="absolute top-0 left-0 h-full w-full bg-black z-20 text-white  duration-500 text-center flex items-center justify-center text-sm font-semibold rounded-lg" >
            Product Removed
            <button className="ml-2 text-sm font-semibold text-zinc-900 dark:text-white rounded-md border border-white px-2 py-1 flex" 
            onClick={() => revertDelete(product.id)}>
              {deleteLoading ?
                <div className="animate-pulse opacity-100 duration-500 text-center flex items-center justify-center text-sm font-semibold rounded-lg" >
                  Undoing Delete...
                  </div>
                :
                <span>Undo Delete</span>
              } 
            </button>
          </div>
        }
        <div className="flex items-center gap-4">
          <div className="relative sm:size-16 size-12 scale-125 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-700"
            onClick={() => setSelectedImageIdx((selectedImageIdx + 1) % sortedImages.length)}
          >
             <div className={`absolute top-0 left-0 h-full w-full bg-black/40 z-10 flex items-center justify-center ${isChangingImg ? "hidden" : "block"}`}>
                <LoaderIcon className="animate-spin duration-500" />
              </div>
            {sortedImages.length > 0 && (
              <Image
                src={transformedImageUrl("w_512,q_auto")}
                alt={title}
                fill
                onBlur={() => setIsChaningImg(false)}
                className="object-cover"
              />
            )}
          </div>

          <div>
            <h3 className="font-semibold truncate sm:text-sm  md:max-w-full max-w-36 text-xs md:text-md text-zinc-900 dark:text-white">
              {title}
            </h3>

            <p className="mt-1 sm:text-sm text-[10px] text-zinc-500">
              {category?.name}
            </p>
          </div>
        </div>
      </td>
      
      {/* Category */}

      <td className="md:px-6 md:py-5 p-0 text-left h-full  md:table-cell hidden ">   
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800">
          {category?.name}
        </span>
      </td>

      {/* Price */}

      <td className="md:px-6 md:py-5 p-2 text-[11px] sm:text-sm font-semibold text-zinc-900 dark:text-white">
        ₹{price}
      </td>

      {/* Stock */}

      <td className="md:px-6 md:py-5 p-2">
        <div className="space-y-2">
          <div className="font-medium text-[11px] sm:text-sm text-zinc-900 dark:text-white">
            {sortedColors?.[0]?.availableMeters || 0}m
          </div>

        </div>
      </td>

      {/* Featured */}

      <td className="md:px-6 md:py-5 p-2 text-center">
        {featured ? (
          <Star
            size={17}
            className="mx-auto fill-black text-black dark:fill-white dark:text-white"
          />
        ) : (
          <span className="text-zinc-400">—</span>
        )}
      </td>

      {/* Status */}

      <td className="md:px-6 md:py-5 p-2 text-left">
        <span
          className={`rounded-full px-3 py-1 sm:text-sm text-[10px] truncate font-semibold ${stockColor()}`}
        >
          {stockLabel()}
        </span>
      </td>

      {/* Actions */}

      <td className="md:px-6 md:py-5 p-2">
        <ActionMenu
          viewHref={`/products/${product.id}`}
          editHref={`/admin/products/${product.id}/edit`}
          onDuplicate={() => duplicateProduct(product.id) }
          onDelete={() => deleteProduct(product.id) }
        />        
      </td>
    </motion.tr>
  );
}
