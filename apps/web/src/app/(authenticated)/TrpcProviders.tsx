"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { Toaster } from "@repo/ui/ui/toaster.tsx";
import { trpc } from "@/app/(authenticated)/_trpc/client.ts";

export default function TrpcProviders({ children }: { children: ReactNode }) {
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
        <Toaster position="top-right" richColors />
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
