"use client";

import { IndianRupee, Percent } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export default function PricingCard() {
  const {register, control} = useFormContext();
  const [Discount, setDiscount] = useState(0);
  const [gst, setGst] = useState(5);

  const OP = useWatch({
    control, 
    defaultValue : 1 ,
    name: "originalPrice"  
  })

  const SP = useWatch({
    control , 
    defaultValue: 1,
    name : "price"

  })


  useEffect(() => {
    console.log(OP,SP);
    
    setDiscount(
      ((OP-SP)*100)/OP 
    )
  }, [SP, OP])

  return (
    <section className="rounded-2xl bg-white shadow-sm shadow-black/30 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 p-6">
        <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-2">
          <IndianRupee className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Pricing
          </h2>

          <p className="text-sm text-zinc-500">
            Set pricing for this fabric.
          </p>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {/* Prices */}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Selling Price (₹ / meter)
            </label>

            <input {...register("price")}
              type="number"
              placeholder="350"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Original Price
            </label>

            <input {...register("originalPrice")}
              type="number"
              placeholder="450"
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </div>
        </div>

        {/* Discount */}

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-950 dark:border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <Percent className="text-green-600" />

            <div>
              <p className="font-medium text-zinc-900 dark:text-white">
                Discount
              </p>

              <p className="text-sm text-zinc-500">
                Automatically calculated from prices.
              </p>
            </div>
          </div>

          <div className="mt-4 text-3xl font-bold text-green-600">
            {Math.floor(Discount)}%
          </div>
        </div>

        {/* GST */}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              GST (%)
            </label>

            <select value={gst}
            onChange={(e) => setGst(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white">
              <option value={0}>0%</option>
              <option value={5}>5%</option>
              <option value={12}>12%</option>
              <option value={18}>18%</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Unit
            </label>

            <input disabled
              value="Per Meter"
              readOnly
              className="w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            />
          </div>
        </div>

        {/* Price Summary */}

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                Price Summary
              </h3>

              <p className="text-sm text-zinc-500">
                Total payable after GST.
              </p>
            </div>

            <div className="rounded-xl bg-emerald-100 p-3 dark:bg-emerald-900/50">
              <IndianRupee className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Base Price</span>
              <span className="font-medium text-zinc-900 dark:text-white">
                ₹{SP || 0}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">GST ({gst || 0}%)</span>
              <span className="font-medium text-zinc-900 dark:text-white">
                ₹{Math.floor((SP*gst)/100)}
              </span>
            </div>

            <div className="border-t border-dashed border-zinc-300 dark:border-zinc-700 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Total Price
                </span>

                <span className="text-2xl font-bold text-emerald-600">
                  ₹{Number(SP)+Math.floor((SP*gst)/100)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}