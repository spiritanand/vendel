import Header from "@/components/layout/app/buy/Header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <main className="container mx-auto">{children}</main>
    </>
  );
}

export default Layout;
