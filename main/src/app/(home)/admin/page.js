"use client"; 

import StatCard from "@/app/components/admin/StatCard";
import RecentOrders from "@/app/components/admin/RecentOrders";
import InventoryAlerts from "@/app/components/admin/InventoryAlerts";
import RevenueChart from "@/app/components/admin/RevenueChart";
import TopProducts from "@/app/components/admin/TopSelling";
import { useEffect, useState } from "react";
import { getDashboard } from "@/app/lib/controller/getAdminDash";
import { toast } from "react-toastify";
import { exfn } from "@/app/helpers/extractActions";


import {
  Package,
  ShoppingBag,
  IndianRupee,
  AlertTriangle,
} from "lucide-react";


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
  const [data, setData] = useState({});
 

  useEffect(() => {
    const getDashData = async (params) => {
      try {
        let res = await exfn(() => getDashboard());
        setData(res);
      } catch (error) {
        toast.error( error?.message || "Something went wrong")
        console.log("error in getting dashboard", error)
      }
    }
    getDashData()
  }, [])
  

  return (
      <div className="mx-auto max-w-7xl">
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
              field = !field ? data.lowStockCount : field;

              stat.change = field?.change;
              stat.value = field?.value;
              stat.positive = field?.positive;
              
          return (
            <StatCard key={stat.title} {...stat} />
          )})}
        </section>

        {/* Chart + Inventory */}
        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            {/* <RevenueChart /> */} 
            <RecentOrders />          
          </div>

          <InventoryAlerts />
        </section>

        {/* Bottom Section */}
        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
           
          </div>

          <div className="xl:col-span-1">
            <TopProducts />
          </div>
        </section>
      </div>

  );
}