import { db } from "@repo/db";
import { products } from "@repo/db/schema.ts";
import { and, eq } from "drizzle-orm";
import { authedProcedure, router } from "@/server/trpc";
import { doByIdSchema, formSchema } from "@/libWeb/zodSchemas.ts";
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
  delete: authedProcedure
    .input(doByIdSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        user: { id: userId },
      } = ctx;

      const { id } = input;

      await db
        .delete(products)
        .where(and(eq(products.userId, userId), eq(products.id, id)));

      return {
        message: "Product deleted.",
      };
    }),
});

export default productRouter;
