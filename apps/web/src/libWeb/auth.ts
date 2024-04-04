import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CustomCredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SigninMessage } from "@/libWeb/utils/SigninMessage.ts";
import { db } from "@/libWeb/db";
import { users } from "@/libWeb/db/schema.ts";

export const config = {
  providers: [
    CustomCredentialsProvider({
      name: "Solana",
      credentials: {
        message: {
          label: "Message",
          type: "text",
        },
        signature: {
          label: "Signature",
          type: "text",
        },
      },
      authorize: async (credentials, req) => {
        try {
          const signinMessage = new SigninMessage(
            JSON.parse(credentials?.message || "{}") as SigninMessage,
          );
          const nextAuthUrl = new URL(process.env.VERCEL_URL ?? "");

          if (signinMessage.domain !== nextAuthUrl.host) return null;

          const csrfToken = await getCsrfToken({
            req: {
              ...req,
              body: null,
            },
          });

          if (signinMessage.nonce !== csrfToken) return null;

          const validationResult = signinMessage.validate(
            credentials?.signature ?? "",
          );

          if (!validationResult) return null;

          const id = signinMessage.publicKey;

          await db
            .insert(users)
            .values({
              id,
              image: `https://robohash.org/${id}?bgset=bg1&size=100x100`,
            })
            .onConflictDoNothing();

          return {
            id,
          };
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.image = `https://robohash.org/${token.sub}?bgset=bg1&size=100x100`;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  theme: {
    colorScheme: "dark",
    logo: "/favicon.ico",
    brandColor: "#16a34a",
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
