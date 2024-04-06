function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>HEAD</header>
      <main>{children}</main>
    </>
  );
}

export default Layout;
