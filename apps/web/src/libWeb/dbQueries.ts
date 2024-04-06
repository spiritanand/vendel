import { desc, eq } from "drizzle-orm";
import { db } from "@repo/db";
import { products } from "@repo/db/schema";
import { auth } from "@/libWeb/auth.ts";

export async function getAllProducts() {
  const session = await auth();

  return db.query.products.findMany({
    where: eq(products.userId, session?.user?.id ?? ""),
    orderBy: desc(products.createdAt),
  });
}
