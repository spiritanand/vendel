"use client";

import { signOut } from "next-auth/react";
import { Button } from "@repo/ui/ui/button.tsx";
import { useWallet } from "@solana/wallet-adapter-react";

function SignOut() {
  // eslint-disable-next-line @typescript-eslint/unbound-method -- Disconnect is a function
  const { disconnect } = useWallet();

  return (
    <Button
      className="shadow-none"
      onClick={() => {
        void disconnect();
        void signOut({ callbackUrl: "/" });
      }}
    >
      Sign Out
    </Button>
  );
}

export default SignOut;
