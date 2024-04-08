import Link from "next/link";
import Image from "next/image";
import { auth } from "@/libWeb/auth.ts";
import { ROUTES } from "@/libWeb/constants.ts";
import AvatarMenu from "@/components/actions/AvatarMenu.tsx";
import SignIn from "../../actions/SignIn.tsx";

export default async function Header() {
  const session = await auth();

  return (
    <header className="absolute left-0 right-0 top-0 p-4">
      <nav>
        <ul className="flex items-center justify-between">
          <li>
            <Link href="/">
              <Image alt="Vendel" height={40} src="/logo.png" width={40} />
            </Link>
          </li>
          {!session ? (
            <li>
              <SignIn callbackUrl={ROUTES.PRODUCTS} />
            </li>
          ) : null}

          {session ? (
            <>
              <li className="text-2xl">
                <Link href={ROUTES.PRODUCTS}>Dashboard</Link>
              </li>
              <li className="">
                <AvatarMenu />
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </header>
  );
}
