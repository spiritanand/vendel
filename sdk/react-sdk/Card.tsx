import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useGetBalance from "./useGetBalance";
import Product from "./Product";
import * as web3 from "@solana/web3.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

function Card({ productId }: { productId: string }) {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const balance = useGetBalance();

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

      // await addTx.mutateAsync({
      //   id: sig,
      //   from: publicKey.toBase58(),
      //   to: product.userId,
      //   amount: price * 0.98,
      //   productId: product.id,
      // });

      setTxSig(sig);
      setIsSuccess(true);
    } catch (e) {
      console.log({ e });
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/getProductById?productId=${productId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");

        return response.json();
      })
      .then((data) => {
        setProduct(data?.product);
      })
      .catch((error) => {
        console.error("Fetching error: ", error);
      });
  }, []);

  return (
    <div className="card">
      {!publicKey ? (
        <WalletMultiButton />
      ) : (
        <>
          <div className="user">
            <p className="balance">
              Balance:{" "}
              <span className="sol">
                {balance} SOL{" "}
                <img
                  src="https://imgs.search.brave.com/RbEw9wxyAOy81ZrJIK57tMGR-Iq6B4vqxWzMHhgTjkw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9sb2dv/dHlwdXMuY29tL3N2/Zy9zb2xhbmEuc3Zn.svg"
                  alt="Solana"
                  className="solana-logo"
                />
              </span>
            </p>

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
          </div>

          <Product product={product} />

          {isSuccess ? (
            <>
              <p style={{ color: "#22c55e" }}>Transaction sent successfully!</p>
              <a
                href={`https://explorer.solana.com/tx/${txSig}?cluster=devnet`}
                rel="noopener noreferrer"
                target="_blank"
                className="pubkey"
              >
                View transaction
              </a>
            </>
          ) : (
            <button onClick={sendSol}>Pay</button>
          )}
        </>
      )}
    </div>
  );
}

export default Card;
