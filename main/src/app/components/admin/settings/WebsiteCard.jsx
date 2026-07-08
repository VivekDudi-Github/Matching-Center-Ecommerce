"use client";

export default function WebsiteCard() {
  return (
    <div className="rounded-2xl border border-zinc-400 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Website
        </h2>

        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          SEO and social media links.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Website Title
          </label>

          <input
            type="text"
            placeholder="ABC Fabrics"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Meta Description
          </label>

          <textarea
            rows={4}
            placeholder="Describe your business..."
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Instagram
          </label>

          <input
            type="url"
            placeholder="https://instagram.com/..."
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Facebook
          </label>

          <input
            type="url"
            placeholder="https://facebook.com/..."
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            WhatsApp Link
          </label>

          <input
            type="url"
            placeholder="https://wa.me/919876543210"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>
      </div>
    </div>
  );
}