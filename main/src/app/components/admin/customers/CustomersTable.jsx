"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

import CustomerRow from "./CustomerRow";
import CustomerCard from "./CustomerCard";

export default function CustomersTable({ customers = [] }) {
  if (!customers.length) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-16 text-center dark:border-zinc-700 dark:bg-zinc-900">
        <Users
          size={60}
          className="mx-auto mb-4 text-zinc-400"
        />

        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
          No Customers Found
        </h2>

        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Customers will appear here after they place their first order.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm lg:block dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Phone
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Orders
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Total Spent
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Last Order
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Mobile */}

      <div className="space-y-4 lg:hidden">
        {customers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
          />
        ))}
      </div>
    </>
  );
}