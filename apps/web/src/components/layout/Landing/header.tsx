import { auth } from "@/libWeb/auth.ts";
import SignOut from "../../actions/SignOut.tsx";
import SignIn from "../../actions/SignIn";

export default async function Header() {
  const session = await auth();

  return (
    <div>
      {!session && <SignIn />}
      {session?.user ? (
        <>
          {session.user.publicKey} <SignOut />
        </>
      ) : null}
    </div>
  );
}
