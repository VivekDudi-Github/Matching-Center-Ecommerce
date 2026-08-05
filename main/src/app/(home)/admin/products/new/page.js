import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ProductImages from "@/app/components/admin/products/new/ProductImages";
import BasicInfoCard from "@/app/components/admin/products/new/BasicInfoCard";
import PricingCard from "@/app/components/admin/products/new/PricingCard";
import InventoryCard from "@/app/components/admin/products/new/InventoryCard";
import AttributesCard from "@/app/components/admin/products/new/AtrributesCard";
import DescriptionCard from "@/app/components/admin/products/new/DescriptionCard";
import SEOCard from "@/app/components/admin/products/new/SeoCard";
import PublishCard from "@/app/components/admin/products/new/PublishCard";

export default function NewProductPage() {
  
  return (
    <div className="min-h-screen bg-zinc-100 pb-10 dark:bg-black">
      <main className="mx-auto max-w-350 p-4">
        {/* Header */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin/products"
              className="mb-3 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Products
            </Link>

            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Add New Product
            </h1>

            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Create a new fabric product for your catalogue.
            </p>
          </div>
        </div>

        {/* Main Layout */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left */}

          <div className="space-y-6 lg:col-span-5">
            <ProductImages />
          </div>

          {/* Right */}

          <div className="space-y-6 lg:col-span-7">
            <BasicInfoCard />

            <PricingCard />

            <InventoryCard />

            <AttributesCard />

            <DescriptionCard />

            <SEOCard />

            <PublishCard />
          </div>
        </div>
      </main>
    </div>
  );
}