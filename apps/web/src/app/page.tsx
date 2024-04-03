import { Button } from "@repo/ui/ui/button.tsx";
import Header from "@/components/layout/Landing/header";
import "@solana/wallet-adapter-react-ui/styles.css";

function Page() {
  return (
    <>
      <Header />
      <div>
        <Button>Hi</Button>
      </div>
    </>
  );
}

export default Page;
