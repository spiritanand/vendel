import type { SelectProduct } from "@repo/db/schema";
import { Button } from "@repo/ui/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/ui/card.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/ui/tooltip.tsx";
import { Share2, Trash2 } from "lucide-react";
import { toast } from "@repo/ui/ui/toaster";
import Solana from "@/components/logos/Solana.tsx";
import { trpc } from "@/app/(authenticated)/_trpc/client.ts";

function ProductCard({
  product,
  sales,
  volume,
}: {
  product: SelectProduct;
  sales: number;
  volume: number;
}) {
  const trpcUtils = trpc.useUtils();
  const deleteProduct = trpc.product.delete.useMutation();

  async function handleCopyLink() {
    await navigator.clipboard.writeText(
      `${window.location.origin}/buy/${product.id}`,
    );

    toast.success("Copied to clipboard");
  }

  function handleDelete() {
    deleteProduct.mutate(
      { id: product.id },
      {
        onSuccess: ({ message }) => {
          toast.success(message);
        },
        onError: () => {
          toast.error("Failed to delete product.");
        },
        onSettled: async () => {
          await trpcUtils.product.getAll.invalidate();
        },
      },
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-10 sm:flex-row">
        <div>
          <div className="text-sm text-gray-500">Price</div>
          <div className="flex gap-3 text-lg font-semibold">
            <Solana />
            <p>{product.price} SOL</p>
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <div className="text-sm text-gray-500">Volume</div>
            <div className="text-lg font-semibold">{volume}</div>
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Sales</div>
          <div className="flex gap-3 text-lg font-semibold">
            <Solana />
            <p>{sales} SOL</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-end space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleCopyLink} variant="secondary">
                <Share2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              className="bg-secondary text-secondary-foreground"
              side="bottom"
            >
              Share
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={deleteProduct.isPending}
                onClick={handleDelete}
                variant="destructive"
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              className="bg-destructive text-destructive-foreground"
              side="bottom"
            >
              Delete
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
