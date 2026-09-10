"use client";

import { User, MapPin, CreditCard, FileText } from "lucide-react";
import {FormProvider, useForm, useWatch} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { newOrderFormSchema } from "@/app/lib/validation/newOrder.schema"; 

const StateList = [
  "Andaman and Nicobar Islands" ,
  "Andhra Pradesh", 
  "Arunachal Pradesh",
  "Assam",  
  "Bihar" ,
  "Chandigarh" , 
  "Chhattisgarh" ,
  "Dadra and Nagar Haveli and Daman and Diu" , 
  "Delhi"  , 
  "Goa" ,
  "Gujarat" ,
  "Haryana" ,
  "Himachal Pradesh" ,
  "Jammu and Kashmir" , 
  "Jharkhand" ,"Karnataka" ,
  "Kerala" ,
  "Ladakh" , 
  "Lakshadweep" , 
  "Madhya Pradesh" ,
  "Maharashtra" ,
  "Manipur" ,
  "Meghalaya" ,
  "Mizoram" ,
  "Nagaland" ,
  "Odisha" ,
  "Puducherry" , 
  "Punjab" ,
  "Rajasthan" ,
  "Sikkim" ,
  "Tamil Nadu" ,
  "Telangana" ,
  "Tripura" ,
  "Uttar Pradesh" ,
  "Uttarakhand" ,
  "West Bengal" ,
]

export default function CustomerDetailsCard() {
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

  const {setValue, register, control,  formState: { errors } } = methods;
  const orderNotes = useWatch({
    control,
    name: "notes",
    defaultValue: ""
  })


  

  return (
    <FormProvider {...methods}>
      <form className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

        {/* Customer Details */}

        <div className="flex items-center gap-2">
          <User size={20} />
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Customer Details
          </h2>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              {...register("name")}
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Phone Number
            </label>

            <input
              {...register("phone")}
              type="tel"
              placeholder="9876543210"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Email (Optional)
            </label>

            <input
              {...register("email")}
              type="email"
              placeholder="example@email.com"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>
        </div>

        {/* Address */}

        <div className="mt-10 flex items-center gap-2">
          <MapPin size={20} />
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Shipping Address
          </h2>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              House No / Street
            </label>

            <input
              {...register("address")}
              type="text"
              placeholder="House No, Street"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Area / Locality
            </label>

            <input
              {...register("area")}
              type="text"
              placeholder="Area"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Landmark
            </label>

            <input
              {...register("landmark")}
              type="text"
              placeholder="Optional"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              City
            </label>

            <input
              {...register("city")}
              type="text"
              placeholder="City"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              State & Union Territory
            </label>

            <select
              {...register("state")}
              type="text"
              placeholder="State"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            >
              {StateList.map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Pincode
            </label>

            <input
              {...register("pincode")}
              type="text"
              placeholder="Pincode"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>
        </div>

        {/* Payment */}

        <div className="mt-10 flex items-center gap-2">
          <CreditCard size={20} />
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Payment Method
          </h2>
        </div>

        <div className="mt-5 rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              {...register("payment")}
              type="radio"
              defaultChecked
              name="payment"
            />

            <div>
              <p className="font-medium dark:text-white">
                UPI Payment
              </p>

              <p className="text-sm text-zinc-500">
                Secure online payment
              </p>
            </div>
          </label>
        </div>

        {/* Notes */}

        <div className="mt-10 flex items-center gap-2">
          <FileText size={20} />
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Order Notes
          </h2>
        </div>

        <textarea
          {...register("notes")}
          rows={5}
          maxLength={350}
          placeholder="Any special instructions for this order..."
          className="mt-5 w-full rounded-xl border border-zinc-300 bg-white p-4 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
        />
          <p className={`text-xs text-right ${orderNotes.length >= 350 ? "text-red-500" : "text-zinc-500"}`}>
            {orderNotes.length}/350 characters max
          </p>
      </form>
    </FormProvider>
  );
}