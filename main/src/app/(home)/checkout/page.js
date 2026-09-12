"use client";
import CustomerDetailsCard from "@/app/components/checkout/CustomerDetails";
import OrderSummary from "@/app/components/checkout/OrderSummary";
import CheckoutSteps from "@/app/components/checkout/CheckoutSteps";
import {FormProvider, useForm, useWatch} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { newOrderFormSchema } from "@/app/lib/validation/newOrder.schema"; 
import { toast } from "react-toastify";
import { useState } from "react";

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
  const methods = useForm({
      resolver: zodResolver(newOrderFormSchema),
      shouldFocusError: true,
      defaultValues: {
        name: "",
        phone: "",
        email: "",
        address: "",
        area: "",
        locality: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        payment: "",
        notes: "",
      }
    });
  
    const [isLoading, setIsLoading] = useState(false);


  
    const onSubmit = async (data) => {
      setIsLoading(true);
      try {
        console.log(data);
      } catch (error) {
        console.log("error", error);      
        toast.error(error?.message || "Something went wrong");
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


  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onErrors)} 
        className="min-h-screen bg-zinc-100 dark:bg-zinc-950"
      >
        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-10">
          {/* Heading */}

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Checkout
            </h1>

            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
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
                <OrderSummary />
              </div>
            </div>
          </div>
        </main>
      </form>
    </FormProvider>
  );
}