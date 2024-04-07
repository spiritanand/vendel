import { BarChart4 } from "lucide-react";
import Solana from "@/components/logos/Solana.tsx";
import CreateProductBtn from "@/app/(authenticated)/user/products/create/CreateProductBtn.tsx";
import { getInTx } from "@/libWeb/dbQueries";

async function Stats() {
  const inTxs = await getInTx();

  const totalSales =
    inTxs.reduce((acc, tx) => {
      return acc + tx.amount;
    }, 0) * 0.98;

  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-10 rounded-md bg-gradient-to-tl from-neutral-200 via-teal-300 to-sky-200 p-8 text-black sm:mx-6 sm:my-8 sm:flex-row">
      <div className="flex items-center space-x-4">
        <BarChart4
          className="text-green-800 shadow-lg shadow-green-800"
          height={25}
          width={25}
        />
        <div>
          <div className="text-sm text-gray-500">Total Volume</div>
          <div className="text-lg font-semibold">{inTxs.length}</div>
        </div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Total Sales</div>
        <div className="flex gap-3 text-lg font-semibold">
          <Solana />
          <p>{totalSales} SOL</p>
        </div>
      </div>

      <CreateProductBtn className="ml-auto" />
    </div>
  );
}

export default Stats;
