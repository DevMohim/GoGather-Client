"use client";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  LogOut,
  PlusCircle,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";

type UserMenuShowProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
};

const UserMenuShow = ({ user }: UserMenuShowProps) => {
  const [isChevronClick, setIsChevronClick] = useState<boolean>(false);
  const route = useRouter();
  const handleSignOut = async () => {
    const data = await signOut();
    if (data) {
      toast.success("Logout succefull");
      route.push("/login");
    }
  };
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="bg-transparent hover:bg-transparent outline-none border-none cursor-pointer"
            onClick={() => setIsChevronClick(!isChevronClick)}
          >
            {isChevronClick ? (
              <ChevronUp className="size-4 text-primery" />
            ) : (
              <ChevronDown className="size-4 text-primery" />
            )}
          </Button>
        }
      />

      <PopoverContent align="start" className="w-60">
        <PopoverHeader>
          <PopoverTitle>{user.name}</PopoverTitle>
          <PopoverDescription>{user.email}</PopoverDescription>
        </PopoverHeader>

        <div className="mt-2 flex flex-col">
          <Button
            type="button"
            variant="ghost"
            className="justify-start hover:bg-green-500/10 hover:text-green-600 cursor-pointer"
          >
            <User />
            Profile
          </Button>

          <Link href="/create-event">
            <Button
              type="button"
              variant="ghost"
              className="justify-start hover:bg-green-500/10 hover:text-green-600 cursor-pointer"
            >
              <PlusCircle />
              Create Event
            </Button>
          </Link>

          <Link href="/manage-event">
            <Button
              type="button"
              variant="ghost"
              className="justify-start hover:bg-green-500/10 hover:text-green-600 cursor-pointer"
            >
              <Settings />
              Manage Events
            </Button>
          </Link>

          <Button
            type="button"
            variant="ghost"
            className="justify-start hover:bg-green-500/10 hover:text-green-600 cursor-pointer"
          >
            <CheckCircle />
            Joined Events
          </Button>

          <div className="my-2 border-t" />
          <Button
            type="button"
            variant="ghost"
            className="justify-start text-destructive cursor-pointer hover:bg-red-700/10 hover:text-red-500"
            onClick={handleSignOut}
          >
            <LogOut />
            Log out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserMenuShow;
