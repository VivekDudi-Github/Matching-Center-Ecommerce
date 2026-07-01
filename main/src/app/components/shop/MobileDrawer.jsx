import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function MobileDrawer({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.div 
            initial={{ x: "-100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white dark:bg-zinc-950 z-50 p-6 overflow-y-auto lg:hidden"
          >
            <div className="flex justify-end mb-6">
              <button onClick={onClose} className="dark:text-white">
                <X size={24} />
              </button>
            </div>
            {/* The Sidebar component will be injected here */}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}