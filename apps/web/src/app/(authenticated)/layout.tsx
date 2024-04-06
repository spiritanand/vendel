import Providers from "@/app/(authenticated)/Providers.tsx";
import { auth } from "@/libWeb/auth.ts";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return <Providers session={session}>{children}</Providers>;
}

export default Layout;
