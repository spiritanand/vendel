import TrpcProviders from "@/app/(authenticated)/TrpcProviders.tsx";
import "@solana/wallet-adapter-react-ui/styles.css";

function Layout({ children }: { children: React.ReactNode }) {
  return <TrpcProviders>{children}</TrpcProviders>;
}

export default Layout;
