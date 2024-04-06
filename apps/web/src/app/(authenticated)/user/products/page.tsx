import { Package } from "lucide-react";
import Stats from "@/app/(authenticated)/user/products/Stats.tsx";
import AllProducts from "@/app/(authenticated)/user/products/AllProducts.tsx";
import CreateProductBtn from "@/app/(authenticated)/user/products/create/CreateProductBtn.tsx";
import { getAllProducts, getInTx } from "@/libWeb/dbQueries.ts";

async function Page() {
  const allProducts = await getAllProducts();
  const allInTxs = await getInTx();

  return (
    <>
      <h1 className="container flex items-center gap-2 text-3xl font-bold">
        <Package className="h-5 w-5" />
        Products
      </h1>

      <div className="container overflow-y-auto">
        <Stats />

        {allProducts.length > 0 ? (
          <AllProducts allInTxs={allInTxs} allProducts={allProducts} />
        ) : (
          <div className="mx-auto my-8 max-w-2xl rounded-lg p-6 shadow-md">
            <p className="mb-4 text-sm text-gray-400">
              Set up your products for sale like NFTs, e-commerce or any digital
              product in a few steps.
            </p>

            <CreateProductBtn />
          </div>
        )}
      </div>
    </>
  );
}

export default Page;
