"use client"; 

import StatCard from "@/app/components/admin/StatCard";
import RecentOrders from "@/app/components/admin/RecentOrders";
import InventoryAlerts from "@/app/components/admin/InventoryAlerts";
import TopProducts from "@/app/components/admin/TopSelling";
import { useQuery } from '@tanstack/react-query';

import {
  Package,
  ShoppingBag,
  IndianRupee,
  AlertTriangle,
  Loader2Icon,
} from "lucide-react";
import CancelRequested from "@/app/components/admin/CancelRequested";
import { api } from "@/app/lib/axios";


 const stats = [
    {
      title: "Revenue",
      value: "0",
      change: "0",
      positive: true,
      icon: IndianRupee,
    },
    {
      title: "Orders",
      value: "0",
      change: "0",
      positive: true,
      icon: ShoppingBag,
    },
    {
      title: "Products",
      value: "0",
      change: "0",
      positive: true,
      icon: Package,
    },
    {
      title: "Low Stock",
      value: "0",
      positive: false,
      icon: AlertTriangle,
    },
  ];

export default function AdminDashboard() {
  const {
    data,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: async() => {
      const res = await api.get("/admin/dash");
      return res?.data ;
    },
  })

  return (
      <div className="mx-auto max-w-7xl z-0 relative">
        {(isLoading || isFetching) ? (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm dark:bg-black/30">
            <Loader2Icon className="h-6 w-6 animate-spin text-primary sticky bottom-[50%]" />
            <span className="mt-2 text-sm font-medium text-muted-foreground sticky bottom-[46.5%] ">Loading..</span>
          </div>
        ) : null}

        {/* Heading */}
        <div className="mb-8  flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight  hover:text-green-600">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Welcome back. Here's what's happening with your store today.
            </p>
          </div>
        </div>

        {/* Stat Cards */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
              let field = data?.[stat.title];
              field = !field ? data?.lowStockCount : field;

              stat.change = field?.change;
              stat.value = field?.value;
              stat.positive = field?.positive;
              
          return (
            <StatCard key={stat?.title} {...stat} />
          )})}
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            {/* <RevenueChart /> */} 
            <RecentOrders orders={data?.recentorders} />          
          </div>

          <InventoryAlerts initialAlerts={data?.inventoryAlert?.alerts} initalCursor={data?.inventoryAlert?.newCursor}  />
        </section>

        {/* Bottom Section */}
        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
           <CancelRequested orders={data?.cancelRequests} />
          </div>

          <div className="xl:col-span-">
            <TopProducts />
          </div>
        </section>
      </div>
  );
}