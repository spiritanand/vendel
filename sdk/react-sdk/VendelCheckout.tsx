"use client";
import WalletProviders from "./WalletProviders";
import Card from "./Card";
import "./styles.css";

function VendelCheckout({ productId }: { productId: string }) {
  return (
    <WalletProviders>
      <Card productId={productId} />
    </WalletProviders>
  );
}

export default VendelCheckout;
