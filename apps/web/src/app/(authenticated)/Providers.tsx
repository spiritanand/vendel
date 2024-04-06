"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { Toaster } from "@repo/ui/ui/toaster.tsx";
import { trpc } from "@/app/(authenticated)/_trpc/client.ts";

export default function Providers({
  session,
  children,
}: {
  session: Session | null;
  children: ReactNode;
}) {
  const endpoint = web3.clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);

  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `/api/trpc`,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider autoConnect wallets={wallets}>
            <SessionProvider session={session}>
              <WalletModalProvider>
                <Toaster position="top-right" richColors />
                {children}
              </WalletModalProvider>
            </SessionProvider>
          </WalletProvider>
        </ConnectionProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
