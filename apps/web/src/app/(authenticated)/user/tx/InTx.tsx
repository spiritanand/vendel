import { db } from "@repo/db";
import { transactions } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/libWeb/auth.ts";
import TxItem from "@/app/(authenticated)/user/tx/TxItem.tsx";
import NoTx from "@/app/(authenticated)/user/tx/NoTx.tsx";

async function InTx() {
  const session = await auth();

  const inTxs = await db.query.transactions.findMany({
    where: eq(transactions.to, session?.user?.id ?? ""),
  });

  return (
    <>
      {inTxs.length > 0 ? (
        inTxs.map((tx) => <TxItem key={tx.id} tx={tx} />)
      ) : (
        <NoTx />
      )}
    </>
  );
}

export default InTx;
