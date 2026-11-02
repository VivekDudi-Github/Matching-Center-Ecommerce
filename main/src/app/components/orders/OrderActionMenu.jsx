import { useState, useRef, useEffect } from 'react';
import Link from 'next/link'; 
import { AlertTriangle, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom hook to detect clicks outside the menu
function useClickOutside(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target )) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback]);
}

export default function OrderActionMenu({ order }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  
  
  useClickOutside(menuRef, () => setIsOpen(false));

  const handleCancelConfirm = () => {
    console.log('Order cancelled successfully:', order?.id);
    setIsConfirmOpen(false);
  };


  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Menu Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-amber-600 hover:text-amber-700 transition-colors p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Floating Options Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-40 z-30 rounded-lg border shadow-lg overflow-hidden
                       bg-white border-zinc-200 text-zinc-700
                       dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200"
          >
            <div className="flex flex-col p-1">
              {/* Details Option */}
              <Link
                href={`/checkout/${order?.id}`}
                onClick={() => setIsOpen(false)}
                className="w-full text-left px-3 py-2 text-xs rounded-md font-medium transition-colors
                           hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
              >
                Details
              </Link>

              {/* Cancel Option */}
              <button
                onClick={() => {
                  setIsMenuOpen(false); // Close dropdown
                  setIsConfirmOpen(true); // Open confirm modal
                }}
                className="w-full text-left px-3 py-2 text-xs rounded-md font-medium transition-colors
                           text-rose-600 dark:text-rose-400
                           hover:bg-rose-50 dark:hover:bg-rose-950/30"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {(order?.payment?.status === "Paid" && order.status === "Pending" ) && (
        <AnimatePresence>
          {isConfirmOpen && (
            <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
              {/* Dark semi-transparent background overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsConfirmOpen(false)} // Clicking outside modal closes it
                className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
              />

              {/* Confirmation Dialog Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', duration: 0.3 }}
                className="relative w-full max-w-sm rounded-xl border p-5 shadow-xl z-10
                          bg-white border-zinc-200 text-zinc-900
                          dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-50"
              >
                {/* Header Context */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Cancel Order?</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                      Are you sure you want to cancel this order? This action cannot be undone.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 mt-5 text-xs font-medium">
                  <button
                    onClick={() => setIsConfirmOpen(false)}
                    className="px-3 py-2 rounded-md transition-colors border
                              border-zinc-200 text-zinc-700 hover:bg-zinc-50
                              dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    No, keep it
                  </button>
                  <button
                    onClick={handleCancelConfirm}
                    className="px-3 py-2 rounded-md transition-colors text-white
                              bg-red-600 hover:bg-red-700
                              dark:bg-red-700 dark:hover:bg-red-600"
                  >
                    Yes, cancel order
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
