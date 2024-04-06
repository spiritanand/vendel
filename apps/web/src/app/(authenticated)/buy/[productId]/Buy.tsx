"use client";

import { Button } from "@repo/ui/ui/button.tsx";
import { useSession } from "next-auth/react";
import type { SelectProduct } from "@repo/db/schema";
import { useWallet } from "@solana/wallet-adapter-react";
import useGetBalance from "@/hooks/useGetBalance.ts";

function Buy({ product }: { product: SelectProduct }) {
  const session = useSession();
  const { publicKey } = useWallet();

  const { price, userId } = product;
  const isOwner = session.data?.user?.id === userId;

  const balance = useGetBalance();
  const isSufficient = balance >= price;

  return (
    <>
      <Button
        className="bg-gradient-to-tl from-neutral-200 via-teal-300 to-sky-200 text-xl font-black shadow-sm shadow-teal-300 hover:bg-gradient-to-bl hover:shadow-xl"
        disabled={!isSufficient || isOwner || !publicKey}
      >
        Pay
      </Button>

      {!publicKey ? (
        <p className="text-sm text-gray-300">
          Note: You must login with a wallet to buy this product.
        </p>
      ) : null}

      {isOwner ? (
        <p className="text-sm text-gray-300">
          Note: You own this product. You can't buy your own product.
        </p>
      ) : null}

      <p className="text-sm text-gray-500">
        Disclaimer: This is a DeFi payment that can't be reversed. Funds go
        directly to the merchant.
      </p>
    </>
  );
}

export default Buy;
