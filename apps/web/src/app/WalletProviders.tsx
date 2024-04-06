"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { useMemo } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

function WalletProviders({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const endpoint = web3.clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider autoConnect wallets={wallets}>
        <SessionProvider session={session}>
          <WalletModalProvider>{children}</WalletModalProvider>
        </SessionProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default WalletProviders;
