"use client";

import type { SelectTx } from "@repo/db/schema";
import ProductCard from "@/app/(authenticated)/user/products/ProductCard.tsx";
import type { RouterOutputs } from "@/server";
import { trpc } from "@/app/(authenticated)/_trpc/client.ts";

function AllProducts({
  allProducts,
  allInTxs,
}: {
  allProducts: RouterOutputs["product"]["getAll"];
  allInTxs: SelectTx[];
}) {
  const products = trpc.product.getAll.useQuery(undefined, {
    initialData: allProducts,
  });

  return (
    <div className="space-y-5">
      {products.data.map((product) => {
        // TODO: Potential optimization for large arrays
        const productTxs = allInTxs.filter((tx) => tx.productId === product.id);
        const sales =
          productTxs.reduce((acc, tx) => {
            return acc + tx.amount;
          }, 0) * 0.98;
        const volume = productTxs.length;

        return (
          <ProductCard
            key={product.id}
            product={product}
            sales={sales}
            volume={volume}
          />
        );
      })}
    </div>
  );
}

export default AllProducts;
