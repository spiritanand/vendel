"use client";

import { Button } from "@repo/ui/ui/button.tsx";
import { useSession } from "next-auth/react";
import type { SelectProduct } from "@repo/db/schema";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "@repo/ui/ui/toaster";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import useGetBalance from "@/hooks/useGetBalance.ts";
import { trpc } from "@/app/(authenticated)/_trpc/client.ts";

function Buy({ product }: { product: SelectProduct }) {
  const session = useSession();

  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const addTx = trpc.tx.add.useMutation();

  const { price, userId } = product;
  const isOwner = session.data?.user?.id === userId;

  const balance = useGetBalance();
  const isSufficient = balance >= price;

  const [isSuccess, setIsSuccess] = useState(true);
  const [txSig, setTxSig] = useState("HOLA");

  const sendSol = async () => {
    if (!publicKey) return;

    try {
      const transaction = new web3.Transaction();

      const toPubkey = new web3.PublicKey(product.userId);

      const sendSolToSellerInstruction = web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey,
        lamports: LAMPORTS_PER_SOL * product.price * 0.98,
      });

      const vendelPubkey = new web3.PublicKey(
        "F5zgQ1wKFwM9axWgsGo7e2P19qotHFw6XkCbQ86Paexv",
      );
      const sendSolCommissionInstruction = web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: vendelPubkey,
        lamports: LAMPORTS_PER_SOL * product.price * 0.02,
      });

      transaction.add(sendSolToSellerInstruction);
      transaction.add(sendSolCommissionInstruction);

      const sig = await sendTransaction(transaction, connection);

      await addTx.mutateAsync({
        id: sig,
        from: publicKey.toBase58(),
        to: product.userId,
        amount: price * 0.98,
        productId: product.id,
      });

      toast.success("Transaction Successful");

      setTxSig(sig);
      setIsSuccess(true);
    } catch (e) {
      toast.error("Transaction Failed ");
    }
  };

  return (
    <>
      {isSuccess ? (
        <>
          <p className="text-primary text-3xl font-black">
            Transaction Successful
          </p>
          <p className="text-xs text-gray-500">You can close this window now</p>

          <a
            className="ml-2 flex w-fit items-center gap-2 rounded-md bg-gray-700 p-2 text-xs text-blue-500"
            href={`https://explorer.solana.com/address/${txSig}?cluster=devnet`}
            rel="noopener noreferrer"
            target="_blank"
          >
            View Transaction <ExternalLink width={15} />
          </a>
        </>
      ) : (
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
              Note: You own this product. You cannot buy your own product.
            </p>
          ) : null}

          <p className="text-sm text-gray-500">
            Disclaimer: This is a DeFi payment that cannot be reversed. Funds go
            directly to the merchant.
          </p>
        </>
      )}
    </>
  );
}

export default Buy;
