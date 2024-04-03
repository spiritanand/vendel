import NextAuth from "next-auth";
import { config } from "@/libWeb/auth";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- NextAuth is a library function
const handler = NextAuth(config);

export { handler as GET, handler as POST };
