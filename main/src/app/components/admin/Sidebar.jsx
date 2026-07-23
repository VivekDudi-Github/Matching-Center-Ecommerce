"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Images,
  Settings,
  LogOut,
  Store,
} from "lucide-react";

const links = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    label: "Banners",
    href: "/admin/banners",
    icon: Images,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  console.log(pathname);
  
  return (
    <aside className="hidden shadow shadow-black bg-white lg:flex lg:flex-col  dark:bg-black dark:border-r-[1px] border-gray-800">

      {/* Navigation */}
      <nav className="flex sticky top-13 flex-col gap-2 p-5 overflow-hidden">
        {links.map((item, i) => {
          const active = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center gap-3  w-40 px-4 py-3 duration-150 ${
                  active
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 "
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                <item.icon size={20} />

                <span className="font-medium text-xl">
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}

      {/* <div className="border-t border-zinc-200 p-5 dark:border-zinc-800">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10">
          <LogOut size={20} />

          <span className="font-medium">
            Logout
          </span>
        </button>
      </div> */}
    </aside>
  );
}