import ProductToolbar from "@/app/components/admin/products/ProductToolbar";
import ProductTable from "@/app/components/admin/products/ProductTable";
import {prisma} from "@/app/lib/prisma";
import { serializePrisma } from "@/app/helpers/serializePrisma";
import { getFirstAdminProdList } from "@/app/lib/controller/admin/getAdminProd";
import { exfn } from "@/app/helpers/extractActions";



export default async function ProductsPage({searchParams}) {
  let products = [], cursor = null, errorMsg = null;
  try {
    const query = await searchParams;
    
    const {list, newCursor} = await exfn( () => getFirstAdminProdList(query?.search, query?.category, query?.status));
    products = list;
    cursor = newCursor;
  } catch (error) {
    errorMsg = error?.message || "Something went wrong while fetching.";
    console.log("error in rending product page on server side", error);
  }

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
        <ProductTable initalProducts={products} initialCursor={cursor} errorMsg={errorMsg} />
      </section>
      
    </div>
  );
}
