import { SquarePen } from "lucide-react";
import { CreateProductForm } from "@/app/(authenticated)/user/products/create/CreateProductForm.tsx";

function Page() {
  return (
    <>
      <h1 className="flex items-center gap-2 text-3xl font-bold">
        <SquarePen className="h-5 w-5" />
        Create
      </h1>
      <CreateProductForm />
    </>
  );
}

export default Page;
