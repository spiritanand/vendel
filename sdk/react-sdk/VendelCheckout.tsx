"use client";
import WalletProviders from "./WalletProviders";
import Card from "./Card";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./styles.css";

function VendelCheckout({ productId }: { productId: string }) {
  return (
    <WalletProviders>
      <Card productId={productId} />
    </WalletProviders>
  );
}

export default VendelCheckout;
