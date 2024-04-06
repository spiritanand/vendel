import { ArrowLeftRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/ui/tabs.tsx";
import InTx from "@/app/(authenticated)/user/tx/InTx.tsx";
import OutTx from "@/app/(authenticated)/user/tx/OutTx.tsx";

function Page() {
  return (
    <>
      <h1 className="container flex items-center gap-2 text-3xl font-bold">
        <ArrowLeftRight className="h-5 w-5" />
        Transactions
      </h1>

      <Tabs className="container mt-10" defaultValue="in">
        <TabsList>
          <TabsTrigger value="in">Incoming</TabsTrigger>
          <TabsTrigger value="out">Outgoing</TabsTrigger>
        </TabsList>
        <TabsContent value="in">
          <InTx />
        </TabsContent>
        <TabsContent value="out">
          <OutTx />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default Page;
