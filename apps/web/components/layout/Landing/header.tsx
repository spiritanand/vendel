"use client";

import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import bs58 from "bs58";
import { Button } from "@repo/ui/ui/button.tsx";
import { SigninMessage } from "@/libWeb/utils/SigninMessage.ts";

export default function Header() {
  const { data: session, status } = useSession();

  const wallet = useWallet();
  const walletModal = useWalletModal();

  const handleSignIn = async () => {
    try {
      if (!wallet.connected) {
        walletModal.setVisible(true);
      }

      const csrf = await getCsrfToken();
      if (!wallet.publicKey || !csrf || !wallet.signMessage) return;

      const message = new SigninMessage({
        domain: window.location.host,
        publicKey: wallet.publicKey.toBase58(),
        statement: `Sign this message to sign in to the app.`,
        nonce: csrf,
      });

      const data = new TextEncoder().encode(message.prepare());
      const signature = await wallet.signMessage(data);
      const serializedSignature = bs58.encode(signature);

      await signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature: serializedSignature,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (wallet.connected && status === "unauthenticated") {
  //     void handleSignIn();
  //   }
  // }, [wallet.connected]);

  return (
    <div>
      {!session && (
        <>
          <span>You are not signed in</span>
          <Button
            onClick={() => {
              void handleSignIn();
            }}
          >
            Sign in
          </Button>
        </>
      )}
      {session?.user ? (
        <Button
          onClick={() => {
            void signOut();
          }}
        >
          Sign Out
        </Button>
      ) : null}
    </div>
  );
}
