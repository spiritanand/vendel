import Header from "@/components/layout/app/Header.tsx";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="p-4 sm:ml-20 sm:mt-20 sm:p-0">{children}</main>
    </>
  );
}

export default Layout;
