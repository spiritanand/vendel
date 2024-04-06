import { eq } from "drizzle-orm";
import { db } from "@repo/db";
import { transactions } from "@repo/db/schema";
import { auth } from "@/libWeb/auth.ts";
import TxItem from "@/app/(authenticated)/user/tx/TxItem.tsx";
import NoTx from "@/app/(authenticated)/user/tx/NoTx.tsx";

async function OutTx() {
  const session = await auth();

  const outTxs = await db.query.transactions.findMany({
    where: eq(transactions.from, session?.user?.id ?? ""),
  });

  return (
    <>
      {outTxs.length > 0 ? (
        outTxs.map((tx) => <TxItem isIn={false} key={tx.id} tx={tx} />)
      ) : (
        <NoTx />
      )}
    </>
  );
}

export default OutTx;
