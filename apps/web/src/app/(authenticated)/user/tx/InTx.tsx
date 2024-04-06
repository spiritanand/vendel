import TxItem from "@/app/(authenticated)/user/tx/TxItem.tsx";
import NoTx from "@/app/(authenticated)/user/tx/NoTx.tsx";
import { getInTx } from "@/libWeb/dbQueries.ts";

async function InTx() {
  const inTxs = await getInTx();

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
