import { db } from "@repo/db";
import { products } from "@repo/db/schema.ts";
import { authedProcedure, router } from "@/server/trpc";
import { formSchema } from "@/libWeb/zodSchemas.ts";
import { getAllProducts } from "@/libWeb/dbQueries.ts";

const productRouter = router({
  getAll: authedProcedure.query(async () => getAllProducts()),
  add: authedProcedure.input(formSchema).mutation(async ({ ctx, input }) => {
    const {
      user: { id: userId },
    } = ctx;

    await db.insert(products).values({
      ...input,
      userId,
    });

    return {
      message: "Product added.",
    };
  }),
});

export default productRouter;
