"use client";

export default function ShippingCard() {
  return (
    <div className="rounded-2xl border border-zinc-400 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Shipping
        </h2>

        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Configure delivery charges and estimated delivery time.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Shipping Charge (₹)
          </label>

          <input
            type="number"
            placeholder="80"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Free Shipping Above (₹)
          </label>

          <input
            type="number"
            placeholder="2000"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Delivery Time
          </label>

          <input
            type="text"
            placeholder="2-5 Days"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>
      </div>
    </div>
  );
}