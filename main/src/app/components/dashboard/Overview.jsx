import React from 'react';
import { Package, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_ORDERS = [
  { id: 'FA-1045', date: 'Jul 2, 2026', product: 'Premium Silk Blend (3 yds)', total: '₹4,500', status: 'Shipped', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
  { id: 'FA-1032', date: 'Jun 15, 2026', product: 'Organic Cotton Print (5 yds)', total: '₹2,100', status: 'Delivered', color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
];

export default function OverviewView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Welcome back, Rohan</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Here is what is happening with your projects.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Orders', value: '1', icon: Clock },
          { label: 'Total Orders', value: '12', icon: Package },
          { label: 'Saved Fabrics', value: '8', icon: CheckCircle },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 mb-2">
                <Icon size={18} />
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders List */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Recent Orders</h2>
          <button className="text-sm font-medium text-zinc-900 dark:text-white hover:underline">View All</button>
        </div>
        
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {MOCK_ORDERS.map((order) => (
            <div key={order.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-zinc-900 dark:text-white">{order.id}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${order.color}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{order.product}</p>
              </div>
              
              <div className="flex items-center justify-between sm:flex-col sm:items-end gap-1">
                <span className="font-bold text-zinc-900 dark:text-white">{order.total}</span>
                <span className="text-sm text-zinc-500">{order.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}