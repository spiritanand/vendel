import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function useGetBalance() {
  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!publicKey) return;

    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      "confirmed",
    );

    void connection.getAccountInfo(publicKey).then((info) => {
      setBalance(Number(((info?.lamports ?? 0) / LAMPORTS_PER_SOL).toFixed(2)));
    });
  }, [connection, publicKey]);

  return balance;
}
