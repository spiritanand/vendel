import { BadgePlus, Package } from "lucide-react";
import { Button } from "@repo/ui/ui/button.tsx";
import Solana from "@/components/logos/Solana.tsx";

function Page() {
  return (
    <>
      <h1 className="flex items-center gap-2 text-3xl font-bold">
        <Package className="h-5 w-5" />
        Products
      </h1>
      <div className="min-h-screen">
        <div className="mt-4 flex flex-col items-center gap-6 sm:mx-6 sm:my-8 sm:flex-row">
          <div className="flex items-center space-x-4">
            <div>
              <div className="text-sm text-gray-600">Total Volume</div>
              <div className="text-lg font-semibold">0</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600">Total Sales</div>
            <div className="flex gap-3 text-lg font-semibold">
              <Solana />
              <p>{0.0} SOL</p>
            </div>
          </div>
        </div>
        <div className="mx-auto my-8 max-w-2xl rounded-lg p-6 shadow-md">
          <p className="mb-4 text-sm text-gray-400">
            Set up your products for sale like NFTs, e-commerce or any digital
            product in a few steps.
          </p>
          <Button className="font-semibold">
            <BadgePlus className="mr-2" /> CREATE PRODUCT
          </Button>
        </div>
      </div>
    </>
  );
}

export default Page;
