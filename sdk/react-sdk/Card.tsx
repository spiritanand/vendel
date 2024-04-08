import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useGetBalance from "./useGetBalance";
import Product from "./Product";

function Card({ productId }: { productId: string }) {
  const [product, setProduct] = useState();
  const { publicKey } = useWallet();
  const balance = useGetBalance();

  function handleTx() {
    console.log(`Checkout button clicked for product ${productId}`);
  }

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

          <button onClick={handleTx}>Pay</button>
        </>
      )}
    </div>
  );
}

export default Card;
