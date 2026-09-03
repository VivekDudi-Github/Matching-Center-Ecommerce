'use client'
import Link from "next/link";
import { ArrowLeft, LoaderCircleIcon } from "lucide-react";

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
import { createNewProduct, createNewProductImages } from "@/app/lib/actions/newProduct.action";
import {uploadToCloudinary} from '@/app/lib/services/UploadToCloudinary';
import { useRouter } from "next/navigation";


export default function NewProductPage() {
  const router = useRouter();
  const [signature, setSignature] = useState({
    signature: null ,
    timestamp: null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [productId, setProuctId] = useState(null);

  console.log("allImages", allImages);
  console.log("uploadedImages", uploadedImages);  
  
  const methods = useForm({
    resolver: zodResolver(newProductFormSchema),
    shouldFocusError: true,
    defaultValues: {
        title: "",
        slug: "",
        sku: "",

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
          {name: '', hex: '', hexText: '', availableMeters: '', lowStockAlert: '5' }
        ],

        images: [],

        seoTitle: "",

        washCare: "",

        seoDescription: ""
    }
});
  const {setValue, formState: { errors } } = methods;
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if(allImages.length < 1 ) throw new Error("Please upload atleast one image");
      let product = null;
      if(!productId){
        product = await createNewProduct({...data, images: []});
        setProuctId(product.id);
      } 
      

      const { signature, timestamp } = await getCloudinarySignature();
      if(!signature || !timestamp) { 
        toast.error("Somethings went wrong, try again");
        return;
      }
      setSignature({signature,timestamp});
      
      for (let i = 0; i < allImages.length; i++) {
        const element = allImages[i];
     
        const isUploaded = uploadedImages.find(img => img.file.name === element.file.name && img.file.size === element.file.size) ;
        if(isUploaded?.isJoined) continue;


        let uploadedImage = isUploaded;
        if( !isUploaded ) {
          let uploadedData = await uploadToCloudinary(element.file, signature, timestamp);
          
          uploadedImage = {...element, uploadData: uploadedData, isJoined : false};
          setUploadedImages(prev => [...prev, uploadedImage]);
        }
       
        
        await createNewProductImages(productId || product.id, {...uploadedImage, file: null,  displayOrder: element.displayOrder});
        setUploadedImages((prev) => {
          const newImages = prev.filter(img => img.file.name !== element.file.name);
          return [...newImages, {...uploadedImage, isJoined : true}];  
        })
        
      }
      return router.push(`/admin/products`);

    } catch (error) {
      console.log("error", error);      
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const onErrors = (errors) => {
    const keys = Object.keys(errors) ;
    console.log("onErrors", errors);
    
    if(keys.length > 0) {
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
        {!isLoading && <div className=" w-full h-full bg-black/50  z-10">Loading</div>} 
      </FormProvider>
      {isLoading && 
        <div className="fixed top-0 left-0 flex flex-col justify-center  items-center w-full h-full bg-black/80 z-10">
          <LoaderCircleIcon className="w-12 h-12 text-white animate-spin ease-in-out duration-200 " />
        
          {!productId && <p className="text-white text-center animate-pulse opacity-20 duration-100">Saving Product</p>} 
          {productId && <p className="text-white text-center animate-pulse opacity-20 duration-100">Saving Product Images</p>}
        </div>
      }
    </div>
  );
}