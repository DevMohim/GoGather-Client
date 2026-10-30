"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {  Calendar1, LogOut, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/assest/logo.png";
import { signOut, useSession } from "@/lib/auth-client";
import UserMenuShow from "../UserMenuShow";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import toast from "react-hot-toast";

const navLinks = [
  {
    href: "/events",
    label: "Upcoming Events",
    icon: <Calendar1 className="w-4 -mr-1.5" />,
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter()

  const {data: session } = useSession()
  const user = session?.user

  const handleSignOut = async() => {
    const data = await signOut()
    if(data){
      toast.success('Logout succefull')
      router.push('/login')
    }
  }
 
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span>
            <Image
              src={Logo}
              alt="GoGather logo"
              className="size-10 object-contain"
              priority
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="bg-linear-to-r from-[#10483E] via-primery to-[#2A8A75] bg-clip-text text-2xl font-bold tracking-tight text-transparent">
              GoGather
            </span>
            <span className="text-[7px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Good Things Gather
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "text-sm  flex items-center gap-2 text-dark transition-colors duration-200 hover:text-primery font-bold",
                    isActive ? "text-primary" : "",
                  )}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary transition-transform duration-200",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex shrink-0 items-center gap-2">
              <div className="group relative inline-block">
                <Avatar size="lg">
                  <AvatarImage
                    src={user.image ?? undefined}
                    alt={user.name}
                    className="bg-zinc-100"
                  />
                  <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>

                <span
                  className="pointer-events-none absolute left-1/2 top-full z-10 mt-2
                   -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900
                   px-2 py-1 text-xs text-white opacity-0 transition-opacity
                   group-hover:opacity-100"
                >
                  {user.name}
                </span>
              </div>
              
              <UserMenuShow user={user} />

              <Link href="/login">
                <Button
                  type="button"
                  variant="ghost"
                  className="justify-start text-destructive cursor-pointer hover:text-white hover:bg-secondery border border-dark/20"
                  onClick={handleSignOut}
                >
                  <LogOut />
                  Log out
                </Button>
              </Link>

              <button
                type="button"
                onClick={() => setOpen((open) => !open)}
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
                className="flex size-9 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-100 md:hidden"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          ) : (
            <Link href="/login">
              <Button
                size="lg"
                className="hidden rounded-full bg-linear-to-r from-[#F28C45] to-[#D96A2B] px-5 pb-1 text-white shadow-sm transition-all duration-300 hover:from-[#E77A35] hover:to-secondery hover:shadow-md md:inline-flex cursor-pointer"
              >
                Login
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden cursor-pointer"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ease-out md:hidden",
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="container mx-auto flex flex-col gap-1 px-4 py-3 sm:px-6">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="mt-1">
            <Button
              className="w-full rounded-full bg-linear-to-r from-[#F28C45] to-[#D96A2B]"
              size="lg"
              nativeButton={false}
              render={<Link href="/login" />}
            >
              Login
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
