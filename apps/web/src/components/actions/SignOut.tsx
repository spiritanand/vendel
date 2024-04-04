"use client";

import { signOut } from "next-auth/react";
import { Button } from "@repo/ui/ui/button.tsx";

function SignOut() {
  return (
    <Button
      className="p=0 px-0 py-0"
      onClick={() => {
        void signOut({ callbackUrl: "/" });
      }}
      variant="secondary"
    >
      Sign Out
    </Button>
  );
}

export default SignOut;
