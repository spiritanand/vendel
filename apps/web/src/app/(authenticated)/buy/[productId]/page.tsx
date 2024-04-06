import { db } from "@repo/db";
import { products } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/ui/card.tsx";
import { redirect } from "next/navigation";
import Solana from "@/components/logos/Solana";
import { auth } from "@/libWeb/auth.ts";
import Buy from "./Buy";

async function Page({ params }: { params: { productId: string } }) {
  const { productId } = params;
  const session = await auth();

  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  });

  if (!product) redirect("/");

  return (
    <Card>
      <div className="h-3 w-full bg-gradient-to-tl from-neutral-200 via-teal-300 to-sky-200" />
      <CardHeader>
        <CardTitle className="text-4xl">{product.name}</CardTitle>
        <CardDescription className="text-lg">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="flex items-center gap-2">
          Total Price:{" "}
          <span className="flex items-center gap-2">
            <span className="font-bold">{product.price}</span> <Solana />
          </span>
        </p>
        <p className="mt-2 w-fit rounded-md bg-gray-700 p-2 text-xs text-gray-400">
          To:
          <a
            className="ml-2 text-blue-500"
            href={`https://explorer.solana.com/address/${product.userId}?cluster=devnet`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {product.userId}
          </a>
        </p>
      </CardContent>
      <CardFooter className="flex-col justify-center gap-2">
        <Buy product={product} />
      </CardFooter>
    </Card>
  );
}

export default Page;
