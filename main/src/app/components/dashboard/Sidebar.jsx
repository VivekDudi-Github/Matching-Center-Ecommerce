import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  Heart, 
  MapPin, 
  Settings, 
  LogOut, 
  X 
} from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'wishlist', label: 'Saved Fabrics', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab, isMobileOpen, closeMobile }) {
  const NavLinks = () => (
    <div className="flex flex-col gap-2 mt-8">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              closeMobile();
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              isActive 
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md' 
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Icon size={18} />
            {item.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeMobile}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-6 z-50 flex flex-col transition-transform lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between lg:justify-center mb-4">
          <h2 className="text-xl font-bold tracking-tighter text-zinc-900 dark:text-white">
            FABRIC ATELIER
          </h2>
          <button onClick={closeMobile} className="lg:hidden text-zinc-500">
            <X size={24} />
          </button>
        </div>

        <NavLinks />

        <div className="mt-auto pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </motion.aside>
    </>
  );
}