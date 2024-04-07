import SignIn from "@/components/actions/SignIn";

function Page() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-xl font-semibold">Connect you wallet</h1>
      <SignIn className="p-8 text-4xl font-bold" />
    </main>
  );
}

export default Page;
