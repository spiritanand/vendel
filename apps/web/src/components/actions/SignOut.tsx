"use client";

import { signOut } from "next-auth/react";
import { Button } from "@repo/ui/ui/button.tsx";

function SignOut() {
  return (
    <Button
      className="shadow-none"
      onClick={() => {
        void signOut({ callbackUrl: "/" });
      }}
    >
      Sign Out
    </Button>
  );
}

export default SignOut;
