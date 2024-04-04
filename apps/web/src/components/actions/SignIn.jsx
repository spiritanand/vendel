"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { getCsrfToken, signIn } from "next-auth/react";
import bs58 from "bs58";
import { Button } from "@repo/ui/ui/button";
// import { useRouter } from "next/navigation";
import { SigninMessage } from "@/libWeb/utils/SigninMessage";

function SignIn() {
  const wallet = useWallet();
  const walletModal = useWalletModal();
  // const router = useRouter();

  const handleSignIn = async () => {
    try {
      if (!wallet.connected) walletModal.setVisible(true);

      const csrf = await getCsrfToken();

      if (!wallet.publicKey || !csrf || !wallet.signMessage) return;

      const message = new SigninMessage({
        domain: window.location.host,
        publicKey: wallet.publicKey.toBase58(),
        statement: `Sign this message to sign in to the vendel.`,
        nonce: csrf,
      });

      const data = new TextEncoder().encode(message.prepare());
      const signature = await wallet.signMessage(data);
      const serializedSignature = bs58.encode(signature);

      await signIn("credentials", {
        message: JSON.stringify(message),
        signature: serializedSignature,
        callbackUrl: "/user/dashboard",
      });
    } catch (error) {
      console.error("Failed to sign in", error);
    }
  };

  return (
    <Button
      onClick={() => {
        void handleSignIn();
      }}
    >
      Sign in
    </Button>
  );
}

export default SignIn;
