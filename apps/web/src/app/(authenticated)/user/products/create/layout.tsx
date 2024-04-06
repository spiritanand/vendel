import { SquarePen } from "lucide-react";
import Stepper from "@/app/(authenticated)/user/products/create/stepper.tsx";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="container flex items-center gap-2 text-3xl font-bold">
        <SquarePen className="h-5 w-5" />
        Create
      </h1>

      <Stepper />

      {children}
    </>
  );
}

export default Layout;
