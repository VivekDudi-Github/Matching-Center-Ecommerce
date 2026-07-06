
import ProductToolbar from "@/app/components/admin/products/ProductToolbar";
import ProductTable from "@/app/components/admin/products/ProductTable";

const products = [
  {
    id: 1,
    name: "Premium Cotton White",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300",
    category: "Cotton",
    price: 280,
    stock: 125.5,
    featured: true,
    status: "Active",
  },
  {
    id: 2,
    name: "Printed Rayon",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300",
    category: "Rayon",
    price: 340,
    stock: 42.75,
    featured: false,
    status: "Active",
  },
  {
    id: 3,
    name: "Linen Blue",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300",
    category: "Linen",
    price: 420,
    stock: 9.5,
    featured: true,
    status: "Active",
  },
  {
    id: 4,
    name: "Silk Blend",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300",
    category: "Silk",
    price: 780,
    stock: 0,
    featured: false,
    status: "Out of Stock",
  },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Products
          </h1>

          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            Manage your fabric inventory and product catalogue.
          </p>
        </div>
      </div>

      {/* Toolbar */}

      <ProductToolbar />

      {/* Products */}

      <ProductTable products={products} />

    </div>
  );
}