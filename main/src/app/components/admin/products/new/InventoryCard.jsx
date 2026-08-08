"use client";

import { Package2, AlertTriangle, PlusIcon, Trash2Icon } from "lucide-react";
import { useFormContext, useFieldArray } from "react-hook-form";
import ColorPickerRow from "./ColorPickerRow";

export default function InventoryCard({isNewProduct = true}) {
  const {register, control} = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "colors" , control
  });

  const appendNewField = () => {
    append({
      name: "",
      hex: "",
      hexText: "",
      availableMeters: "",
      lowStockAlert: ""
    });
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-black/30 dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}

      <div className="flex items-center gap-3 border-b border-zinc-200 p-6 dark:border-zinc-800">
        <div className="rounded-xl bg-zinc-100 p-2 dark:bg-zinc-800">
          <Package2 className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Inventory
          </h2>

          <p className="text-sm text-zinc-500">
            Manage available stock and inventory alerts.
          </p>
        </div>
      </div>

      {/* Body */}

        {/* Alert */}

        <div className="flex items-start mx-2 gap-3 rounded-xl border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-500/10">
          <AlertTriangle className="mt-0.5 text-yellow-600" size={18} />

          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            You'll receive a dashboard alert when stock falls below the configured lower stock alert.
          </p>
        </div>
      

      {fields.map((field, index) => (
        <div key={field.id} className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-semibold">Color #{index+1}</h3>

            <button 
            type='button' 
            onClick={() => remove(index)} 
            className="text-red-500 hover:text-red-600 bg-white rounded-md p-1 transition hover:bg-red-50  dark:hover:bg-red-900">
              <Trash2Icon size={18} />
            </button>
          </div>
            
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Color Name
              </label>

              <input 
                {...register(`colors.${index}.name` )}
                placeholder="Navy Blue"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
              />
            </div>

            <ColorPickerRow index={index} />

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Available Stock (Meters)
              </label>

              <input
                {...register(`colors.${index}.availableMeters`, {valueAsNumber : true})}
                type="number"
                step="0.1"
                placeholder="125.50"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
              />
            </div>

            {/* Low Stock */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Low Stock Alert
              </label>

              <input
                {...register(`colors.${index}.lowStockAlert`, {valueAsNumber: true} )}
                type="Number"
                step="0.1"
                placeholder="20"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
              />
            </div>
          </div>
        </div>
      ))}

      <button 
      onClick={appendNewField}
        type="button"
        className="flex w-full mt-6  justify-center items-center gap-2 rounded-xl bg-zinc-900 dark:bg-white dark:text-black px-4 py-2 text-white hover:bg-zinc-800 dark:hover:bg-zinc-400"
      >
        <PlusIcon size={18} />
        Add Color
      </button>
    </section>
  );
}


