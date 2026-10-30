"use client";

import * as Ably from "ably";
import { toast } from "react-toastify";
import { BellIcon } from "lucide-react";

import React, { useState, useEffect, useRef } from 'react';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


export default function CustomerNotifications({ customerId, orderId }) {
  const [showMessages, setShowMessages] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const containerRef = useRef(null);
  const clientRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowMessages(false);
      }
    }
    
    if (showMessages) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMessages]);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };


  useEffect(() => {
    if (!customerId) return;
    
    const handleMessage = (message) => {
      if (message.name !== "notification") return;
      toast.info(message.data.message);
      if(message.data.orderId !== orderId) return;

      setNotifications((previous) => [
        {
          id: message.id ?? `${Date.now()}-${Math.random()}`,
          ...message.data.message,
        },
        ...previous,
      ]);
    };
    let channel;
    const buildConnection = async () => {
      try {
        const res = await fetch("/api/ably/token");
         if (!res.ok) {
          throw new Error(`Failed to fetch Ably token: ${response.statusText}`);
        }
        const tokenData = await res.json();
        
        const client = new Ably.Realtime({
          tokenDetails: tokenData, 
          clientId: tokenData.clientId,
        });
    
        channel = client.channels.get(
          `customer:${customerId}:notifications`
        );
    
        clientRef.current = client;
        channel.subscribe("notification", handleMessage);
      
      } catch (error) {
        console.log("error in customer notification at checkout", error);
      }
    }

    buildConnection();
    return () => {
      if(channel) channel.unsubscribe("notification", handleMessage);
      if(clientRef.current) client.close();
    };
  }, [customerId]);

  return (
    // Relative wrapper guarantees the absolute dialog positions perfectly near the icon
    <div ref={containerRef} className="relative inline-block">
      {/* Bell Trigger (Hover to open, Click toggles) */}
      <div
        onClick={() => setShowMessages(prev => !prev)}
        className="p-2 rounded-md bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-600 shadow-md cursor-pointer transition-colors relative"
      >
        <Bell className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-pulse">
            {notifications.length}
          </span>
        )}
      </div>

      {/* Floating Overlap Dialog */}
      <AnimatePresence>
        {showMessages && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-3 z-50 w-72 rounded-xl shadow-2xl overflow-hidden border
                       border-zinc-100 bg-white text-zinc-900
                       dark:border-zinc-600 dark:bg-zinc-900 dark:text-slate-100"
          >
            {/* Header Area */}
            <div className="px-3 py-2 flex justify-between items-center bg-zinc-50/50 border-b border-zinc-100 dark:bg-zinc-950/40 dark:border-slate-800">
              <span className="text-[11px] font-bold tracking-wider text-gray-600 dark:text-gray-400 uppercase">
                Checkout Updates
              </span>
              <span className="text-[10px] bg-zinc-100 text-gray-800 dark:bg-slate-800 dark:text-slate-300 px-1.5 py-0.5 rounded-full font-medium">
                {notifications.length} New
              </span>
            </div>

            {/* List Body */}
            <div className="max-h-64 overflow-y-auto p-2 flex flex-col gap-1.5 custom-scrollbar">
              <AnimatePresence initial={false}>
                {notifications.length === 0 ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-center text-zinc-400 dark:text-zinc-500 py-6 font-medium"
                  >
                    All caught up!
                  </motion.p>
                ) : (
                  notifications.map((notification) => (
                    <motion.div
                      key={notification?.id}
                      layout
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="group relative p-2.5 pr-7 rounded-lg border transition-all duration-200
                                 border-zinc-50 bg-zinc-50/50 hover:bg-zinc-50/30 hover:border-zinc-100
                                 dark:border-slate-800/40 dark:bg-slate-800/30 dark:hover:bg-slate-800/60 dark:hover:border-slate-700"
                    >
                      <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                        Order Status
                      </h4>
                      <p className="text-xs text-zinc-600 dark:text-slate-300 mt-0.5 leading-normal">
                        {notification?.message}
                      </p>

                      {/* Inline Dismiss Cross Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents clicking the item from triggering other actions
                          removeNotification(notification.id);
                        }}
                        className="absolute right-1.5 top-1.5 p-0.5 rounded text-zinc-400 
                                   hover:text-zinc-600 hover:bg-zinc-200/60
                                   dark:text-slate-500 dark:hover:text-slate-200 dark:hover:bg-slate-700
                                   opacity-0 group-hover:opacity-100 transition-all duration-150"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
