import { db } from "@repo/db";
import { transactions } from "@repo/db/schema.ts";
import { authedProcedure, router } from "@/server/trpc";
import { insertTx } from "@/libWeb/zodSchemas.ts";

const txRouter = router({
  add: authedProcedure.input(insertTx).mutation(async ({ input }) => {
    await db.insert(transactions).values({
      ...input,
    });

    return {
      message: "Transaction successfully.",
    };
  }),
});

export default txRouter;
