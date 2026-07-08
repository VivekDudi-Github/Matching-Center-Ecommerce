"use client";

export default function StoreCard() {
  return (
    <div className="rounded-2xl border border-zinc-400 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Store Information
        </h2>

        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Basic details about your store.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Store Name */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Store Name
          </label>

          <input
            type="text"
            placeholder="ABC Fabrics"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>

        {/* GST */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            GST Number
          </label>

          <input
            type="text"
            placeholder="22AAAAA0000A1Z5"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>

        {/* Logo */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Store Logo
          </label>

          <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 p-8 dark:border-zinc-700">
            <div className="text-center">
              <p className="font-medium">
                Upload Logo
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                PNG, JPG or SVG
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}