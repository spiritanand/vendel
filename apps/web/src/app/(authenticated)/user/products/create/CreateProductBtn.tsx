import { Button } from "@repo/ui/ui/button.tsx";
import { BadgePlus } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/libWeb/constants.ts";

function CreateProductBtn({ className }: { className?: string }) {
  return (
    <Link className={className} href={ROUTES.CREATE.BASIC}>
      <Button className="font-semibold">
        <BadgePlus className="mr-2" /> CREATE PRODUCT
      </Button>
    </Link>
  );
}

export default CreateProductBtn;
