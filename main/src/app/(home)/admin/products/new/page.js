'use client'
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ProductImages from "@/app/components/admin/products/new/ProductImages";
import BasicInfoCard from "@/app/components/admin/products/new/BasicInfoCard";
import PricingCard from "@/app/components/admin/products/new/PricingCard";
import InventoryCard from "@/app/components/admin/products/new/InventoryCard";
import AttributesCard from "@/app/components/admin/products/new/AtrributesCard";
import DescriptionCard from "@/app/components/admin/products/new/DescriptionCard";
import SEOCard from "@/app/components/admin/products/new/SeoCard";
import PublishCard from "@/app/components/admin/products/new/PublishCard";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import { newProductFormSchema } from "@/app/lib/validation/product.schema";
import { getCloudinarySignature } from "@/app/lib/services/Cloudinary";
import { createNewProductImages } from "@/app/lib/actions/newProduct.action";

export default function NewProductPage() {
  const [signature, setSignature] = useState({
    signature: null ,
    timestamp: null
  });
  const [allImages, setAllImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [productId, setProuctId] = useState(null);

  console.log("allImages", allImages);
  
  
  const methods = useForm({
    resolver: zodResolver(newProductFormSchema),
    shouldFocusError: true,
    defaultValues: {
        title: "",
        slug: "",

        price: "",

        originalPrice: "",

        featured: false,

        isPublished: false,

        description: "",

        width : "",
        
        pattern: "",

        category: '`',

        tags: [],

        colors: [
          {name: '', hex: '', hexText: '', availableMeters: '', lowStockAlert: '' }
        ],

        images: [],

        seoTitle: "",

        washCare: "",

        seoDescription: ""
    }
});
  const {setValue, formState: { errors } } = methods;
  
  const onSubmit = async (data) => {
    console.log("onSubmit", data);
    try {
      
      if(!productId){
        const product = await createNewProduct(data);
        setProuctId(product.id);
      }

      const { signature, timestamp } = await getCloudinarySignature();
      if(!signature || !timestamp) { 
        toast.error("Somethings went wrong, try agian");
        return;
      }
      
      for (let i = 0; i < allImages.length; i++) {
        const element = allImages[i];
        try {
          const isUploaded = uploadedImages.find(img => img.file.name === element.file.name) ;
          if(isUploaded?.isJoined) continue;


          let uploadedImage = null;
          if( !isUploaded ) {
            // uploadedImage = await uploadToCloudinary(element.file, signature, timestamp);
            uploadedImage = true ;
            setUploadedImages(prev => [...prev, {...element, uploadData: uploadedImage, isJoined : false}]);
          }

          // await createNewProductImages(productId, {...uploadedImage, displayOrder: element.displayOrder});
          setUploadedImages((prev) => {
            const newImages = prev.filter(img => img.file.name !== element.file.name);
            return [...newImages, {...element, uploadData: uploadedImage, isJoined : true}];
          })

        } catch (error) {
          toast.error(error?.message || "Something went wrong");
        }
      }
      
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  }

  const onErrors = (errors) => {
    const keys = Object.keys(errors) ;
    if(keys.length > 0) {
      console.log(errors[keys[0]]);
      const isArray = Array.isArray(errors[keys[0]]);
      if(isArray) {
        toast.error(errors[keys[0]][0].message || "Please fill all required color fields");  
      } else if(errors[keys[0]].root) {
        toast.error(errors[keys[0]].root.message || "Please fill all required fields");  
      } else {
        toast.error(errors[keys[0]].message || "Please fill all required fields");
      }
      return;
    }
  }

  useEffect(() => {
    setValue("images", allImages);
  }, [allImages, setValue]);

  return (
    <div className="min-h-screen bg-zinc-100 pb-10 dark:bg-black">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, onErrors)} className="mx-auto max-w-350 p-1 sm:p-4">
        {/* Header */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link
                href="/admin/products"
                className="mb-3 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
              >
                <ArrowLeft size={16} />
                Back to Products
              </Link>

              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                Add New Product
              </h1>

              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                Create a new fabric product for your catalogue.
              </p>
            </div>
          </div>

          {/* Main Layout */}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left */}

            <div className="space-y-6 lg:col-span-5">
              <ProductImages setAllImages={setAllImages} allImages={allImages} uploadedImages={uploadedImages} />         
            </div>

            {/* Right */}

            <div className="space-y-6 lg:col-span-7">
              <BasicInfoCard />

              <PricingCard />

              <InventoryCard />

              <AttributesCard />

              <DescriptionCard />

              <SEOCard />

              <PublishCard />
            </div>
          </div>
        </form> 
      
      </FormProvider>
    </div>
  );
}