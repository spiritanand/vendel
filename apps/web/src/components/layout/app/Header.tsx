"use client";

import Link from "next/link";
import {
  ArrowRightLeft,
  Home,
  LineChart,
  LucideLayoutDashboard,
  Package,
  PanelLeft,
  Settings,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/ui/tooltip.tsx";
import { Sheet, SheetContent, SheetTrigger } from "@repo/ui/ui/sheet.tsx";
import { Button } from "@repo/ui/ui/button.tsx";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AvatarMenu from "@/components/actions/AvatarMenu.tsx";

function Header() {
  const pathname = usePathname();

  return (
    <>
      <aside className="bg-background fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link
            className="text-primary-foreground group flex shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:text-base"
            href="/user/dashboard"
          >
            <Image alt="Vendel" height={50} src="/logo.png" width={50} />
            <span className="sr-only">Vendel</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`${
                    pathname === "/user/dashboard"
                      ? "text-accent-foreground"
                      : "text-muted-foreground"
                  } hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8`}
                  href="/user/dashboard"
                >
                  <LucideLayoutDashboard className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>

            {/*Products*/}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`${
                    pathname === "/user/products"
                      ? "text-accent-foreground"
                      : "text-muted-foreground"
                  } hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8`}
                  href="/user/products"
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Products</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>

            {/*TX*/}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`${
                    pathname === "/user/tx"
                      ? "text-accent-foreground"
                      : "text-muted-foreground"
                  } hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8`}
                  href="/user/tx"
                >
                  <ArrowRightLeft className="h-5 w-5" />
                  <span className="sr-only">Transactions</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Transactions</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`${
                    pathname === "/user/settings"
                      ? "text-accent-foreground"
                      : "text-muted-foreground"
                  } hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8`}
                  href="/user/settings"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>

        <AvatarMenu />
      </aside>

      <header className="bg-background sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b p-3 sm:hidden sm:h-auto sm:border-0 sm:bg-transparent">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="px-0 py-0 sm:hidden"
              size="icon"
              variant="outline"
            >
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-xs" side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                className="bg-primary text-primary-foreground group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:text-base"
                href="/user/dashboard"
              >
                <Image alt="Vendel" height={50} src="/logo.png" width={50} />
                <span className="sr-only">Vendel</span>
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                href="/user/dashboard"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                href="/user/products"
              >
                <Package className="h-5 w-5" />
                Products
              </Link>
              <Link
                className="text-foreground flex items-center gap-4 px-2.5"
                href="/user/tx"
              >
                <ArrowRightLeft className="h-5 w-5" />
                Transactions
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                href="/user/settings"
              >
                <LineChart className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <AvatarMenu />
      </header>
    </>
  );
}

export default Header;
