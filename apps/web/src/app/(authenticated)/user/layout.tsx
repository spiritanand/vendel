import Header from "@/components/layout/app/Header.tsx";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="sm:ml-20">{children}</main>
    </>
  );
}

export default Layout;
