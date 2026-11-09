import { SkeletonBlock } from '@/app/helpers/SkeletonComp';
import React from 'react'

function loading() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div
            href="/admin/orders"
            className="mb-3 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
          >
            {`<`} Back to Orders
          </div>

          

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Order #...
            </h1>

            
          </div>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Placed on ...
          </p>
        </div>
      </div>

      {/* Top Grid */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {Array.from({length: 4}).map((b,i) => (
          <div key={i} className='rounded-2xl border h-36 animate-pulse border-zinc-300 bg-zinc-300 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-800' ></div>      
        ))}
      </div>
    </div>
  );
}

export default loading