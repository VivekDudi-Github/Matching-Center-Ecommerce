"use client";

export default function PaymentCard() {
  return (
    <div className="rounded-2xl border border-zinc-400 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Payment
        </h2>

        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Configure your UPI payment details.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* UPI ID */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            UPI ID
          </label>

          <input
            type="text"
            placeholder="yourstore@upi"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>

        {/* Merchant */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Merchant Name
          </label>

          <input
            type="text"
            placeholder="ABC Fabrics"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
          />
        </div>

        {/* QR */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            UPI QR Code
          </label>

          <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 p-8 dark:border-zinc-700">
            <div className="text-center">
              <p className="font-medium">Upload QR Code</p>
              <p className="mt-1 text-sm text-zinc-500">
                PNG or JPG
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}