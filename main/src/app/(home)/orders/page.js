"use client";

import { motion } from "framer-motion";
import OrdersHeader from "@/app/components/orders/OrdersHeader";
import OrdersList from "@/app/components/orders/OrderList";
import { useSession } from "next-auth/react";
import HeaderSkeleton from "@/app/components/orders/skeleton/HeaderSkeleton";
import { useEffect, useState } from "react";
import OrderCardSkeleton from "@/app/components/orders/skeleton/OrderCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/lib/axios";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [customer, setCustomer] = useState({});

  const { data: customerData } = useQuery({
    queryKey: ["customer", session?.user?.email],
    queryFn: async () => {
      const res = await api.get(`/customer?email=${session?.user?.email}`);
      return res.data;
    },
    enabled: status === "authenticated" && !!session?.user?.email,
  });

  useEffect(() => {
    if (customerData) {
      setCustomer(customerData);
    }
  }, [customerData]);

  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get(`/order`);
      return res.data;
    },
    enabled: status === "authenticated",
  });

  const orders = ordersData?.orders || [];
  const cursor = ordersData?.cursor || null;


  return (
    <main className="min-h-screen -mt-12 bg-zinc-50 px-4 py-8 pt-12 text-zinc-900 dark:bg-black dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            My Orders
          </h1>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            View your previous orders and track their delivery status.
          </p>
        </motion.div>

        {/* Customer Profile */}
        {status === "authenticated" && (
          <OrdersHeader customer={customer} session={session} />
        )}
        {status === "loading" && (
          <HeaderSkeleton customer={customer} />
        )}

        {/* Orders */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Your Orders</h2>

              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                {orders?.length} orders
              </p>
            </div>
          </div>

          {(ordersLoading && orders?.length === 0) ?
            Array.from({length: 4}, (_, i) => <OrderCardSkeleton key={i} />)
            : <OrdersList initialOrders={orders} initialCursor={cursor} />
          } 

        </section>
      </div>
    </main>
  );
}