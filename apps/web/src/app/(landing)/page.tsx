import Image from "next/image";
import Link from "next/link";
import { Button } from "@repo/ui/ui/button";
import Header from "@/components/layout/Landing/header.tsx";
import SignIn from "@/components/actions/SignIn";
import { auth } from "@/libWeb/auth";
import { ROUTES } from "@/libWeb/constants.ts";

async function Page() {
  const session = await auth();

  return (
    <>
      <Header />

      <main className="container flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-primary text-center text-5xl font-black uppercase sm:text-6xl md:text-9xl">
          Integrate web3 checkout
        </h1>
        <h2 className="text-primary mt-1 text-center text-3xl font-bold uppercase">
          in your apps
        </h2>
        <h3 className="text-primary mt-5 flex items-center justify-center gap-3 text-center text-xl">
          Powered by{" "}
          <Image alt="solana" height={30} src="/sol-logo.svg" width={30} />
        </h3>

        {session ? (
          <Link href={ROUTES.PRODUCTS}>
            <Button className="mt-16 p-8 text-4xl font-black">
              Go To Dashboard
            </Button>
          </Link>
        ) : (
          <SignIn className="mt-16 p-10 text-5xl font-black" />
        )}
      </main>
    </>
  );
}

export default Page;
