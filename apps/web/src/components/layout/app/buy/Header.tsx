import Image from "next/image";
import SignIn from "@/components/actions/SignIn.tsx";
import { auth } from "@/libWeb/auth";
import AvatarMenu from "@/components/actions/AvatarMenu.tsx";

async function Header() {
  const session = await auth();

  return (
    <header className="flex items-center justify-between px-10">
      <Image alt="Vendel" height={80} src="/fullLogo.png" width={80} />

      <nav>{session ? <AvatarMenu /> : <SignIn callbackUrl="#" />}</nav>
    </header>
  );
}

export default Header;
