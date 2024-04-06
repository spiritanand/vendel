import TrpcProviders from "@/app/(authenticated)/TrpcProviders.tsx";

function Layout({ children }: { children: React.ReactNode }) {
  return <TrpcProviders>{children}</TrpcProviders>;
}

export default Layout;
