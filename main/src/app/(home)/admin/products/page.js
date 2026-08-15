import ProductToolbar from "@/app/components/admin/products/ProductToolbar";
import ProductTable from "@/app/components/admin/products/ProductTable";
import {prisma} from "@/app/lib/prisma";



export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      id : "desc"
    }, 
    take: 11
  })
  const hasMoreLength = products.length > 10;
  if(hasMoreLength) {
    products.pop();
  }
  const cursor = hasMoreLength ? 
      products[products.length - 1].id : 
      null;

  return (
    <div className="space-y-2">

      {/* Header */}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="md:text-3xl px-2 pt-2 sm:text-xl text-lg font-bold tracking-tight text-zinc-900 dark:text-white duration-200">
            Products
          </h1>

          <p className="px-2 sm:text-base text-xs text-zinc-500 dark:text-zinc-400">
            Manage your fabric inventory and product catalogue.
          </p>
        </div>
      </div>


      {/* Products */}
      <section className="md:mt-8 mt-4 grid grid-cols-1">
        <ProductTable initalProducts={products} initialCursor={cursor} />

      </section>
      
    </div>
  );
}

// const products = [
//   {
//     id: 1,
//     name: "Premium Cotton White",
//     image:
//       "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300",
//     category: "Cotton",
//     price: 280,
//     stock: 125.5,
//     featured: true,
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Printed Rayon",
//     image:
//       "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300",
//     category: "Rayon",
//     price: 340,
//     stock: 42.75,
//     featured: false,
//     status: "Active",
//   },
//   {
//     id: 3,
//     name: "Linen Blue",
//     image:
//       "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300",
//     category: "Linen",
//     price: 420,
//     stock: 9.5,
//     featured: true,
//     status: "Active",
//   },
//   {
//     id: 4,
//     name: "Silk Blend",
//     image:
//       "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300",
//     category: "Silk",
//     price: 780,
//     stock: 0,
//     featured: false,
//     status: "Out of Stock",
//   },
//   {
//     id: 5,
//     name: "Premium Cotton White",
//     image:
//       "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300",
//     category: "Cotton",
//     price: 280,
//     stock: 125.5,
//     featured: true,
//     status: "Active",
//   },
//   {
//     id: 6,
//     name: "Printed Rayon",
//     image:
//       "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300",
//     category: "Rayon",
//     price: 340,
//     stock: 42.75,
//     featured: false,
//     status: "Active",
//   },
//   {
//     id: 7,
//     name: "Linen Blue",
//     image:
//       "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300",
//     category: "Linen",
//     price: 420,
//     stock: 9.5,
//     featured: true,
//     status: "Active",
//   },
//   {
//     id: 8,
//     name: "Silk Blend",
//     image:
//       "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300",
//     category: "Silk",
//     price: 780,
//     stock: 0,
//     featured: false,
//     status: "Out of Stock",
//   },
// ];