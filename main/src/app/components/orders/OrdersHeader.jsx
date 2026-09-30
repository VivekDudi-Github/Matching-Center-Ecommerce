"use client";

import { motion } from "framer-motion";
import { Mail, Phone, UserRound } from "lucide-react";
import Image from "next/image";

export default function OrdersHeader({ customer, session }) {
  const initials = customer?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-400/50 dark:shadow-none  dark:border-zinc-800 dark:bg-zinc-950 sm:p-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* Avatar */}
        <div className="flex shrink-0 items-center sm:justify-start justify-center sm:w-fit w-full size-20 rounded-full">
          {session?.user?.image ? (
            <Image
              width={80}
              height={80}
              referrerPolicy="no-referrer"
              src={session.user.image}
              alt={`${customer.name}'s avatar`}
              className="ring-4 ring-zinc-100 dark:ring-zinc-900 rounded-full "
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-200 text-xl font-semibold text-zinc-700 ring-4 ring-zinc-50 dark:bg-zinc-900 dark:text-zinc-200 dark:ring-zinc-950 sm:h-24 sm:w-24 sm:text-2xl">
              {initials || <UserRound size={30} />}
            </div>
          )}
        </div>

        {/* Customer information */}
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xl font-semibold text-zinc-900 dark:text-white sm:text-2xl">
            {customer?.name || "Customer"}
          </h2>

          <div className="mt-3 flex flex-col gap-2.5 text-sm text-zinc-500 dark:text-zinc-400 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            {/* Email */}
            {customer?.email && (
              <div className="flex min-w-0 p-1 bg-zinc-300/75 rounded-md dark:bg-zinc-900 dark:text-zinc-400  text-zinc-700 items-center gap-2">
                <Mail
                  size={16}
                  className="shrink-0 text-zinc-400 dark:text-zinc-500"
                />

                <span className="truncate">{customer.email}</span>
              </div>
            )}

            {/* Phone */}
            {customer?.number && (
              <div className="flex items-center gap-2 p-1 bg-zinc-300/75 rounded-md dark:bg-zinc-900 dark:text-zinc-400  text-zinc-700">
                <Phone
                  size={16}
                  className="shrink-0 text-zinc-400 dark:text-zinc-500"
                />

                <span>{customer.number}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}