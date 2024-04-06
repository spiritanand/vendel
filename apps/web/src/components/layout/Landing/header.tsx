import { auth } from "@/libWeb/auth.ts";
import SignIn from "../../actions/SignIn.tsx";

export default async function Header() {
  const session = await auth();

  return <>{!session && <SignIn />}</>;
}
