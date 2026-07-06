"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";

import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Images,
  Settings,
  Store,
  ChevronRightIcon,
  ChevronLeftIcon,
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

export default function MobileSidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}

      <header className="  z-40  flex h-16 items-center justify-between border-b border-zinc-200 bg-white pl-4 dark:border-zinc-800 dark:bg-zinc-900 lg:hidden duration-200">
        <button onClick={() => setOpen(true)}>
          <ChevronRightIcon size={26} />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 "
            />

            {/* Drawer */}

            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-13 z-50 flex h-screen  flex-col bg-white dark:bg-zinc-900"
            >
              {/* Header */}

              <div className="h-16 flex justify-between items-center border-b border-zinc-200 px-5 dark:border-zinc-800">

                <button onClick={() => setOpen(false)}>
                  <ChevronLeftIcon size={26} />
                </button>
              </div>

              {/* Links */}

              <nav className="flex-1 flex items-center flex-col gap-2 py-2">
                {links.map((item) => {
                  const active = pathname?.toLowerCase() === item.href.toLowerCase();
                  
                  return (
                    <Link
                      key={item.href}
                      // href={item.href}
                      onClick={() => setOpen(false)}
                    >
                      <div
                        className={`flex items-center justify-start gap-4  `}
                      >
                        <div className="p-2 hover:bg-white rounded-md text-white hover:text-black  dark:hover:bg-zinc-500 dark:hover:text-black duration-200">   
                          <item.icon size={25}/>
                        </div>

                        {/* {item.label} */}
                      </div>
                    </Link>
                  );
                })}
              </nav>

              {/* Footer */}

              {/* <div className="border-t border-zinc-200 p-5 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                    A
                  </div>

                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">
                      Admin
                    </p>

                    <p className="text-xs text-zinc-500">
                      Store Owner
                    </p>
                  </div>
                </div>
              </div> */}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}