"use client";

import { motion } from "framer-motion";
import OrdersHeader from "@/app/components/orders/OrdersHeader";
import OrdersList from "@/app/components/orders/OrderList";
import { useSession } from "next-auth/react";
import HeaderSkeleton from "@/app/components/orders/skeleton/HeaderSkeleton";
import { useEffect, useState } from "react";
import OrderCardSkeleton from "@/app/components/orders/skeleton/OrderCardSkeleton";
import { fetchOrdersByCustomerId, fetchUserOrders } from "@/app/lib/controller/fetchOrder";
import { toast } from "react-toastify";
import { exfn } from "@/app/hooks/extractActions";
import { fetchCustomerByEmail } from "@/app/lib/controller/fetchCustomer";

const ordersTest = {
  orders: [
  {
    id: "ORD-2026-00124",
    createdAt: "September 22, 2026",
    paymentStatus: "Paid",
    deliveryStatus: "Shipped",
    subtotal: 2450,
    shipping: 80,
    total: 2530,

    orderItems: [
      {
        id: 1,
        name: "Premium Cotton Fabric",
        image: "/images/products/cotton.jpg",
        price: 650,
        category: "Cotton",
        color: [
          {
            colorName: "Sky Blue",
            hex: "#60A5FA",
            quantity: 2.5,
          },
          {
            colorName: "White",
            hex: "#FFFFFF",
            quantity: 1.5,
          },
        ],
      },
      {
        id: 2,
        name: "Printed Rayon Fabric",
        image: "/images/products/rayon.jpg",
        price: 850,
        category: "Rayon",
        color: [
          {
            colorName: "Maroon",
            hex: "#7F1D1D",
            quantity: 1.5,
          },
        ],
      },
    ],
  },

  {
    id: "ORD-2026-00108",
    createdAt: "September 15, 2026",
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
    subtotal: 1850,
    shipping: 0,
    total: 1850,

    items: [
      {
        id: 3,
        name: "Soft Silk Fabric",
        image: "/images/products/silk.jpg",
        price: 925,
        category: "Silk",
        color: [
          {
            colorName: "Wine",
            hex: "#722F37",
            quantity: 1,
          },
          {
            namecolorName: "Black",
            hex: "#000000",
            quantity: 1,
          },
        ],
      },
    ],
  },

  {
    id: "ORD-2026-00091",
    createdAt: "September 5, 2026",
    paymentStatus: "Pending",
    deliveryStatus: "Pending",
    subtotal: 1200,
    shipping: 80,
    total: 1280,

    items: [
      {
        id: 4,
        name: "Printed Cotton Fabric",
        image: "/images/products/printed-cotton.jpg",
        price: 600,
        category: "Cotton",
        colors: [
          {
            name: "Green",
            hex: "#22C55E",
            meters: 2,
          },
        ],
      },
    ],
  },
]};

const customerTest = {
  name: "Vivek Dudi",
  email: "vivek@example.com",
  number: "+91 98765 43210",
  avatar: null,
};

export default function OrdersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const [customer, setCustomer] = useState(customerTest);
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const fetch = async () => {
        try {
          const customer = await exfn(() => fetchCustomerByEmail(session?.user?.email));
          const orders = await exfn(() => fetchUserOrders(null));

          setCustomer(customer);
          setOrders(orders?.orders || []);
        } catch (error) {
          console.log("error in fetching customer and orders", error);
          toast.error(error?.message || "Something went wrong");
        } finally {
          setIsLoading(false);
        }
      }
      fetch();
    }
  }, [session, status])


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
          <OrdersHeader customer={customer} />
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
                {orders.length} orders
              </p>
            </div>
          </div>

          {(isLoading && orders?.length === 0) ?
            Array.from({length: 4}, (_, i) => <OrderCardSkeleton key={i} />)
            : <OrdersList orders={orders} cursor={orders?.cursor} />
          } 

        </section>
      </div>
    </main>
  );
}