import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { auth } from "@/libWeb/auth.ts";
import Providers from "./Providers";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Vendel",
  description: "Power you checkouts using crypto payments",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${poppins.className} dark`}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
