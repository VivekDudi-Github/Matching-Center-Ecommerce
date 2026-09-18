"use client";
import CustomerDetailsCard from "@/app/components/checkout/CustomerDetails";
import OrderSummary from "@/app/components/checkout/OrderSummary";
import CheckoutSteps from "@/app/components/checkout/CheckoutSteps";
import {FormProvider, useForm, useWatch} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { newOrderFormSchemaClient } from "@/app/lib/validation/newOrder.schema"; 
import { toast } from "react-toastify";
import { useState } from "react";
import useCartStore from "@/app/store/CartStore";
import { useHydratedStore } from "@/app/hooks/useHyderatedStore";
import { createorder } from "@/app/lib/actions/order.action";

const CART = [
  {
    id: 1,
    name: "Premium Cotton White",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500",
    price: 280,
    quantity: 2.5,
    color: "White",
    width: '44"',
  },
  {
    id: 2,
    name: "Printed Rayon Floral",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500",
    price: 340,
    quantity: 4,
    color: "Blue",
    width: '44"',
  },
  {
    id: 3,
    name: "Linen Blend Premium",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500",
    price: 420,
    quantity: 3,
    color: "Beige",
    width: '44"',
  },
];


export default function CheckoutPage() { 
  const isHyderated = useHydratedStore();


  const items = useCartStore(s => s.items);

  const getStorageData = (feild) => {
    if(typeof  window !== "undefined") {
      return JSON.parse(localStorage.getItem("userDetails")  )?.[feild] ?? "";
    } 
    return "";
  }
  
  const methods = useForm({
      resolver: zodResolver(newOrderFormSchemaClient),
      shouldFocusError: true,
      defaultValues: {
        name:  getStorageData("name"),
        phone: getStorageData("phone"),
        email: getStorageData("email"),
        address: getStorageData("address"),
        area:  getStorageData("area"),
        locality: getStorageData("locality"),
        landmark: getStorageData("landmark"),
        city:  getStorageData("city"),
        state: getStorageData("state"),
        pincode: getStorageData("pincode"),
        payment: getStorageData("payment"),
        notes: getStorageData("notes"),
      }
    });
     
  
    
   const [isLoading, setIsLoading] = useState(false);


  
    const onSubmit = async (data) => {
      setIsLoading(true);
      try {
        let filteredCartData = items.map(item => ({
          productId : item.id,
          productName : item.title,
          productPrice : item.price,
          color : item.color.filter(c => c.quantity > 0)
              .map(c => ({
                colorId : c.id,
                colorName : c.name,
                quantity : c.quantity
            })
          )
        }))
        data.items = filteredCartData;
        const response = await createorder(data);

        if(!response?.success){
          console.log("response" , response.message);
          if(!Array.isArray(response.message)) return toast.error(response.message || "Something went wrong", {autoClose: 7000});
          response.message.slice(0,4).forEach(message => toast.error(message));
          return;
        }
        if(response.success) toast.success(response.message || "Order created successfully", {autoClose: 7000});
      } catch (error) {
        console.log("error", error);      
        toast.error(error?.message || "Something went wrong", {
          autoClose: 10000
        });
      } finally {
        setIsLoading(false);
      }
    }

    const onErrors = (errors) => {
      console.log("onErrors", errors);
      const keys = Object.keys(errors) ; 
      
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


  if(!isHyderated) return null;
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onErrors)} 
        className="min-h-screen bg-zinc-100 dark:bg-linear-to-b from-zinc-900 via-zinc-950 to-black"
      >
        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-10">
          {/* Heading */}

          <div className="mb-4">
            <h1 className="sm:text-3xl text-2xl font-bold text-zinc-900 dark:text-white">
              Checkout
            </h1>

            <p className="mt-1 sm:text-base text-sm text-zinc-500 dark:text-zinc-400">
              Fill in your details and review your order before placing it.
            </p>
          </div>

          <CheckoutSteps currentStep={2}/>

          {/* Layout */}

          <div className="grid gap-6 lg:grid-cols-12">
            {/* Customer Details */}

            <div className="lg:col-span-7">
              <CustomerDetailsCard />
            </div>

            {/* Order Summary */}

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <OrderSummary isLoading={isLoading}/>
              </div>
            </div>
          </div>
        </main>
      </form>
    </FormProvider>
  );
}