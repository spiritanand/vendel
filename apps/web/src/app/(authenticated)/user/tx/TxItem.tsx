import type { SelectTx } from "@repo/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/ui/card.tsx";
import { Badge } from "@repo/ui/ui/badge.tsx";
import Solana from "@/components/logos/Solana";

function TxItem({ tx, isIn = true }: { tx: SelectTx; isIn?: boolean }) {
  return (
    <Card className="flex items-center gap-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          {tx.amount} <Solana />
        </CardTitle>
        <CardDescription>
          <Badge variant={isIn ? "default" : "destructive"}>
            {isIn ? "Credit" : "Debit"}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <p className="w-fit rounded-md bg-gray-700 p-2 text-xs text-gray-400">
          {isIn ? "From" : "To"}:
          <a
            className="ml-2 text-blue-500"
            href={`https://explorer.solana.com/address/${isIn ? tx.from : tx.to}?cluster=devnet`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {isIn ? tx.from : tx.to}
          </a>
        </p>
      </CardContent>
      <CardFooter className="p-0">
        <p className="w-fit rounded-md bg-gray-700 p-2 text-xs text-gray-400">
          On explorer:
          <a
            className="ml-2 text-blue-500"
            href={`https://explorer.solana.com/tx/${tx.id}?cluster=devnet`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {tx.id}
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}

export default TxItem;
