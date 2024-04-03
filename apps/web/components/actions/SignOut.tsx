"use client";

import { signOut } from "next-auth/react";
import { Button } from "@repo/ui/ui/button.tsx";

function SignOut() {
  return (
    <Button
      onClick={() => {
        void signOut();
      }}
    >
      Sign Out
    </Button>
  );
}

export default SignOut;
