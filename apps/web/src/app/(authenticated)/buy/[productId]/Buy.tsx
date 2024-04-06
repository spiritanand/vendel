"use client";

import { Button } from "@repo/ui/ui/button.tsx";
import { useSession } from "next-auth/react";
import type { SelectProduct } from "@repo/db/schema";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "@repo/ui/ui/toaster";
import { useRouter } from "next/navigation";
import useGetBalance from "@/hooks/useGetBalance.ts";
import { trpc } from "@/app/(authenticated)/_trpc/client.ts";

function Buy({ product }: { product: SelectProduct }) {
  const session = useSession();
  const router = useRouter();

  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const addTx = trpc.tx.add.useMutation();

  const { price, userId } = product;
  const isOwner = session.data?.user?.id === userId;

  const balance = useGetBalance();
  const isSufficient = balance >= price;

  const sendSol = async () => {
    if (!publicKey) return;

    try {
      const transaction = new web3.Transaction();

      const toPubkey = new web3.PublicKey(product.userId);

      const sendSolInstruction = web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey,
        lamports: LAMPORTS_PER_SOL * product.price,
      });

      transaction.add(sendSolInstruction);

      const sig = await sendTransaction(transaction, connection);

      await addTx.mutateAsync({
        id: sig,
        from: publicKey.toBase58(),
        to: product.userId,
        amount: price,
        productId: product.id,
      });

      toast.success("Transaction Successful");
      router.push("/user/tx");
    } catch (e) {
      toast.error("Transaction Failed ");
    }
  };

  return (
    <>
      <Button
        className="bg-gradient-to-tl from-neutral-200 via-teal-300 to-sky-200 text-xl font-black shadow-sm shadow-teal-300 hover:bg-gradient-to-bl hover:shadow-xl"
        disabled={
          !isSufficient || isOwner || !session.data?.user || addTx.isPending
        }
        onClick={sendSol}
      >
        Pay
      </Button>

      {!session.data?.user ? (
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
