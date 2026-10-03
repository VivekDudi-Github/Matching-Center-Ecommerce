"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import { FormProvider, useForm } from 'react-hook-form';
import CheckoutSteps from '@/app/components/checkout/CheckoutSteps';
import CustomerDetailsCard from '@/app/components/checkout/CustomerDetails';
import OrderSummary from '@/app/components/checkout/OrderSummary';
import { zodResolver } from '@hookform/resolvers/zod';
import { newOrderFormSchemaClient } from '@/app/lib/validation/newOrder.schema';
import { exfn } from '@/app/hooks/extractActions';
import { fetchOrderById } from '@/app/lib/controller/fetchOrder';
import { toast } from 'react-toastify';
import { AlertTriangleIcon, Loader2Icon } from "lucide-react";
import { SkeletonBlock } from '@/app/hooks/SkeletonComp';
import CheckSumSkeleton from '@/app/components/checkout/CheckSumSkeleton';
import OrderStatus from '@/app/components/orders/OrderStatus';


export default function page() {
  const {id} = useParams();
  
  const {data : session, status} = useSession();

  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState();

  const methods = useForm({
    resolver: zodResolver(newOrderFormSchemaClient),
    shouldFocusError: true,
    disabled: true,
    defaultValues: {
      name:  "",
      phone: "",
      email: "",
      address: "",
      area:  "",
      landmark: "",
      city:  "",
      state: "",
      pincode: "UPI",
      payment: "",
      notes: "",
    }
  });
  

  useEffect(() => {
    if(status === "authenticated" && id){
      const fetch = async () => {
        try {
          const order = await exfn(() => fetchOrderById(id));
          const setValue = methods.setValue;

          setValue("name", order.customer.name);
          setValue("phone", order.customer.number);
          setValue("email", order.customer.email);
          setValue("address", order.address.address);
          setValue("area", order.address.area);
          setValue("landmark", order.address.landmark);
          setValue("city", order.address.city);
          setValue("state", order.address.state);
          setValue("pincode", order.address.pincode);
          setValue("notes", order.notes);

          setOrder(order);
        } catch (error) {
          console.log("error in fetching order", error);
          toast.error(error?.message || "Something went wrong");
        } finally {
          setIsLoading(false);
        }
      }
      fetch();
    }
  }, [session, id])

  return (
     <FormProvider {...methods}>
      <form  onSubmit={() => {}} 
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

          <CheckoutSteps currentStep={3}/>

          

          {/* Layout */}

          <div className="grid gap-6 lg:grid-cols-12">
            {/* Customer Details */}
            
            <div className="lg:col-span-7 relative">
              {status !== "authenticated" && 
                <div className="">
                  <p className="mt-6 flex sm:text-base text-base text-red-500 dark:text-red-400 ">
                    <AlertTriangleIcon className="mr-2 size-5 " />
                    Please login first so you can track your orders
                  </p>
                  <button type="button" 
                    hidden={status == "authenticated"} 
                    onClick={() => signIn("google")}
                    className="mt-3 flex h-12 w-full mb-3 cursor-pointer items-center justify-center rounded-xl bg-black text-base font-bold text-white transition hover:opacity-90 dark:bg-white disabled:opacity-50 dark:text-black">
                      {(isLoading || status === "loading") ?
                        <Loader2Icon className="animate-spin"/> 
                        :
                        "Google Login / SignUp"
                      }
                  </button>
                </div>
              }
              <CustomerDetailsCard session={session} status={status} />
            </div>

            {/* Order Summary */}

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                {isLoading ? 
                  <CheckSumSkeleton />
                    : 
                  <OrderSummary isLoading={isLoading} order={order} session={session} status={status}/>  
                }
                
              </div>
            </div>
          </div>
        </main>
      </form>
    </FormProvider>
  )
}
