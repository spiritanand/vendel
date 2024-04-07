import { db } from "@repo/db";
import { transactions, zodInsertTx } from "@repo/db/schema.ts";
import { authedProcedure, router } from "@/server/trpc";

const txRouter = router({
  add: authedProcedure.input(zodInsertTx).mutation(async ({ input }) => {
    await db.insert(transactions).values({
      ...input,
    });

    return {
      message: "Transaction successfully.",
    };
  }),
});

export default txRouter;
