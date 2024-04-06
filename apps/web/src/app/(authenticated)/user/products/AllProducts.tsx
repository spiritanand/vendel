"use client";

import ProductCard from "@/app/(authenticated)/user/products/ProductCard.tsx";
import type { RouterOutputs } from "@/server";
import { trpc } from "@/app/(authenticated)/_trpc/client.ts";

function AllProducts({
  allProducts,
}: {
  allProducts: RouterOutputs["product"]["getAll"];
}) {
  const products = trpc.product.getAll.useQuery(undefined, {
    initialData: allProducts,
  });

  return (
    <div className="space-y-5">
      {products.data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default AllProducts;
