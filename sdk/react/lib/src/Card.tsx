import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useGetBalance from "./useGetBalance";
import Product from "./Product.tsx";

function Card({ productId }: { productId: string }) {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const balance = useGetBalance();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [product, setProduct] = useState<
    | {
        id: string;
        name: string;
        price: number;
        description: string;
        userId: string;
      }
    | undefined
  >();
  const [isSuccess, setIsSuccess] = useState(false);
  const [txSig, setTxSig] = useState("");

  const sendSol = async () => {
    if (!publicKey || !product) return;

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

      await fetch("https://vendel.xyz/api/public/addTx", {
        method: "POST", // Specify the method
        headers: {
          // Headers are important! They tell the server what type of data you're sending.
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: sig,
          from: publicKey.toBase58(),
          to: product.userId,
          amount: product.price * 0.98,
          productId: product.id,
        }),
      });

      setTxSig(sig);
      setIsSuccess(true);
    } catch (e) {
      console.log({ e });
    }
  };

  useEffect(() => {
    fetch(`https://vendel.xyz/api/public/getProductById?productId=${productId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");

        return response.json();
      })
      .then((data) => {
        setProduct(data?.product);
      })
      .catch((error) => {
        setIsError(true);
        console.error("Fetching error: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <div className="vendel-card">
      {isLoading ? <span className="loader" /> : null}

      {product ? (
        <>
          <div className="user">
            <p className="balance">
              Balance:{" "}
              <span className="sol">
                {balance} SOL{" "}
                <img
                  alt="Solana"
                  className="solana-logo"
                  src="https://imgs.search.brave.com/RbEw9wxyAOy81ZrJIK57tMGR-Iq6B4vqxWzMHhgTjkw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9sb2dv/dHlwdXMuY29tL3N2/Zy9zb2xhbmEuc3Zn.svg"
                />
              </span>
            </p>

            {publicKey ? (
              <p className="connected-wallet">
                Connected:{" "}
                <a
                  className="pubkey"
                  href={`https://explorer.solana.com/address/${publicKey}?cluster=devnet`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {publicKey.toString().slice(0, 5)}...
                  {publicKey.toString().slice(-5)}
                </a>
              </p>
            ) : null}
          </div>

          <Product product={product} />

          {!publicKey ? (
            <WalletMultiButton />
          ) : (
            <>
              {isSuccess ? (
                <>
                  <p style={{ color: "#22c55e" }}>
                    Transaction sent successfully!
                  </p>
                  <a
                    className="pubkey"
                    href={`https://explorer.solana.com/tx/${txSig}?cluster=devnet`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    View transaction
                  </a>
                </>
              ) : (
                <button onClick={sendSol} type="button">
                  Pay
                </button>
              )}
            </>
          )}
        </>
      ) : null}

      {isError ? (
        <p className="error">Error fetching product. Please check productId</p>
      ) : null}
    </div>
  );
}

export default Card;
