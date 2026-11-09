"use client";

import { motion } from "framer-motion";
import { AlertCircleIcon, ArrowUpRight, Star, ThumbsUpIcon } from "lucide-react";
import OrderStatus from "../orders/OrderStatus";
import Link from "next/link";

const prod = [
  {
    title : "",
    amaount : "",
    paymentStatus: "",
    deliveryStatus: "",
    date: "",
    view: "",
  }
]


function CancelRequested({orders = []}) {
  const products = [];
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Ordered for Cancellation
          </h2>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Verify the canellation requests
          </p>
        </div>

        <AlertCircleIcon className="text-yellow-500" />
      </div>


      <div className=" overflow-x-auto hidden lg:block">
        {orders.length ? <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Order
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Customer
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Delivery Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Payment Status
              </th>              

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const date = format(order?.payment?.updatedAt,'LLLL d, yyyy');
              return (
                <tr
                  key={order.id}
                  className="border-b border-zinc-100 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
                >

                  <td className="px-6 py-5 relative font-semibold text-zinc-900 dark:text-white">                  
                    <Link 
                      href={"/admin/orders/"+ order.id} 
                      className="after:absolute after:inset-0 after:z-10"
                    />

                    <h3 title={order?.id} className="font-semibold w-fit text-zinc-300 dark:text-white truncate dark:bg-zinc-950 border border-amber-700/50 dark:hover:border-amber-200/50 bg-zinc-950 p-2 rounded-xs   group relative overflow-hidden   px-4 py-2.5 text-sm tracking-wide shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-300 cursor-pointer">
                      ID: {order?.id.slice(0, 8)}...
                      <button
                        type="button"
                        onClick={() => handleCopy(order)}
                        className="shrink-0  pl-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded transition-colors"
                        title="Copy Order ID"
                      >
                        {copied === order?.id ? (
                          <Check size={14} className="text-emerald-500" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </h3>
                  </td>

                  <td className="px-6 py-5 text-zinc-600 dark:text-zinc-300">
                    {order.customer.name}
                  </td>
                  <td className="px-6 py-5 font-medium text-zinc-900 dark:text-white">
                    ₹{order?.payment?.amount}
                  </td>

                  <td className="px-6 py-5">
                      <OrderStatus type={"delivery"} status={order?.status} />
                  </td>

                  <td className="px-6 py-5">
                      <OrderStatus type={"payment"} status={order?.payment?.status} />
                  </td>

                  <td className="px-6 py-5 text-zinc-500 dark:text-zinc-400">
                    {date}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> 
        : (
        <div className="rounded-2xl top-0 left-0 border  border-zinc-400 bg-white p-16 text-center dark:border-black dark:bg-black"> 
          <ThumbsUpIcon
            size={60}
            className="mx-auto mb-5 text-zinc-400"
          />

          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            No cancellation requests
          </h2>

          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Only initiate refund if the product is in your hand.
          </p>
        </div>
        )}
      </div>


    </motion.div>
  );
}

export default CancelRequested