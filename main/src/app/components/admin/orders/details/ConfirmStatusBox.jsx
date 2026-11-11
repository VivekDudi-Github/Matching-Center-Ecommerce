"use client";
import { AlertTriangle, Loader2Icon, LoaderIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { initateRefundingProcess } from '@/app/lib/controller/admin/orderAction';
import { exfn } from '@/app/helpers/extractActions';


export default function ConfirmStatusBox({closeBox, id}) {
  const [checkOne, setCheckOne] = useState(false);
  const [checkTwo, setCheckTwo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartRefund = async () => {
    if(!checkOne || !checkTwo) return toast.info("Both check box must be clicked.")
    try {
      setIsLoading(true);

      const res = await exfn(() => initateRefundingProcess({id: id}));
      console.log(res);      

    } catch (error) {
      toast.error(error?.message || "Something went wrong in intiating the refund. Check the amount if deducted before retrying.")
      console.log("erorr in doing cancelling and strted refunding process", error)
    } finally{
      setIsLoading(false);
    }
  };

  return (
  <AnimatePresence>
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      {/* Dark semi-transparent background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => closeBox()} // Clicking outside modal closes it
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
      />

      {/* Confirmation Dialog Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.3 }}
        className="relative w-full max-w-md rounded-xl border p-5 shadow-xl z-10
                  bg-white border-zinc-200 text-zinc-900
                  dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-50"
      >
        {/* Header Context */}
        <div className="flex items-start gap-3 ">
          <div className="p-2 rounded-full bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Cancel Order?</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed mb-2">
              Make sure to check boxes because confirming here will initiate refund process.
            </p>
            <div className='flex gap-2 items-start '>
              <input type="checkbox" onChange={(e) => setCheckOne(e.target?.checked)} className=" mt-0.5 h-4 w-4 cursor-pointer rounded-xs border-zinc-300 bg-transparent text-zinc-950 accent-zinc-950 focus:ring-1 focus:ring-zinc-900 focus:ring-offset-0 dark:border-zinc-700 dark:bg-transparent dark:text-white dark:accent-white dark:focus:ring-zinc-300 " /> 
              Have You insepected the product yourself.
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" onChange={(e) => setCheckTwo(e.target?.checked)} className=" mt-0.5 h-4 w-4 cursor-pointer rounded-xs border-zinc-300 bg-transparent text-zinc-950 accent-zinc-950 focus:ring-1 focus:ring-zinc-900 focus:ring-offset-0 dark:border-zinc-700 dark:bg-transparent dark:text-white dark:accent-white dark:focus:ring-zinc-300 " /> 
                Are you sure the product is not in middle of delivery.
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 mt-5 text-xs font-medium">
          <button
            onClick={() => closeBox()}
            className="px-3 py-2 rounded-md transition-colors border
                      border-zinc-200 text-zinc-700 hover:bg-zinc-50
                      dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            No, keep it
          </button>
          <button
            disabled={isLoading}
            onClick={() => handleStartRefund()}
            className="px-3 py-2 rounded-md transition-colors text-white
                      bg-red-600 hover:bg-red-700
                      dark:bg-red-700 dark:hover:bg-red-600 flex gap-2"
          >
            {isLoading ? <Loader2Icon size={13} className='animate-spin' /> : null}
            Yes, Start Refund
          </button>
        </div>
      </motion.div>
    </div>
  </AnimatePresence>
  )
}
