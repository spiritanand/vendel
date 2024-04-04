import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/ui/dropdown-menu.tsx";
import { Button } from "@repo/ui/ui/button.tsx";
import Image from "next/image";
import SignOut from "@/components/actions/SignOut.tsx";

function AvatarMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="sm:mx-auto">
        <Button
          className="overflow-hidden rounded-full"
          size="icon"
          variant="outline"
        >
          <Image
            alt="Avatar"
            className="overflow-hidden"
            height={100}
            src="https://robohash.org/9f5pd6Uq5kjN96cnesnnpSsErM9tjELUoTShzTkwvyDn"
            width={100}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarMenu;
