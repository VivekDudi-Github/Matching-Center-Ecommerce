"use client";

import { useState } from "react";
import { AlertTriangleIcon, Loader2Icon, Truck } from "lucide-react";
import { exfn } from "@/app/helpers/extractActions";
import { toast } from "react-toastify";
import { changeAdminOrderStatus } from "@/app/lib/controller/admin/getAdminOrder";

const statuses = [
  'Pending',
  'Confirmed',
  'Packed',
  'Shipped',
  'Delivered',
];

const cancelStatus = [
  'Cancelled',
];

export default function StatusCard({ status,id }) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isLoading, setIsLoading] = useState(false);

  const changeStatus = async() => {
    try {
      setIsLoading(true);
      const res = await exfn(() => changeAdminOrderStatus({id, status: currentStatus}));
      toast.success("Status changed to ", currentStatus)
    } catch (error) {
      toast.error(error?.message || "something went wrong")
      console.log("error while changing the order status",error);
    } finally{
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-400 bg-white lg:p-6 p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
          <Truck
            size={22}
            className="text-zinc-700 dark:text-zinc-300"
          />
        </div>

        <div>
          <h2 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-white">
            Order Status
          </h2>

          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            Update order status
          </p>
        </div>
      </div>


      {status === "Camcelrequested" ? 
        <div className="text-red-400 text-base flex gap-2 font-semibold pb-2">
          <AlertTriangleIcon size={50} />
          <p>Customer has requested to cancel the order. Please inspect the product and only after that refund the payment.</p>
        </div> 
      : null }
      <select
        value={currentStatus}
        onChange={(e) => setCurrentStatus(e.target.value)}
        className="w-full rounded-xl border border-zinc-300 text-sm bg-white p-2 md:px-4 md:py-3 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
      >
        {status === "CancelRequested" ? 
          cancelStatus.map((item) => (
            <option key={item}>{item}</option>
          )) : 
          statuses.map((item) => (
            <option key={item}>{item}</option>
          ))
        }
      </select> 
      
      <button
      onClick={changeStatus}
      className="mt-5 w-full flex justify-center gap-2 rounded-xl bg-zinc-900 py-2 font-medium text-white transition hover:bg-zinc-800 dark:hover:bg-zinc-300 dark:bg-white dark:text-zinc-900">
        {isLoading ? <Loader2Icon className="animate-spin" /> : null}
        Save Status
      </button>
    </div>
  );
}