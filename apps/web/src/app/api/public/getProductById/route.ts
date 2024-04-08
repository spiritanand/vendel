import { eq } from "drizzle-orm";
import { db } from "@repo/db";
import { products } from "@repo/db/schema.ts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  // 422
  if (!productId)
    return Response.json(
      { message: "Product ID not provided" },
      { status: 422 },
    );

  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  });

  // 404
  if (!product)
    return Response.json({ message: "Product not found" }, { status: 404 });

  return Response.json({ product });
}
