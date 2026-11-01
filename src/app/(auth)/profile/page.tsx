"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assest/logo.png";
import {useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProfilePage = () => {
  const { data: session} = useSession();
  const user = session?.user;

  

  return (
    <div className="min-h-screen bg-bg">
      <main className="mx-auto max-w-2xl px-4 py-10">
        <Card>
          <CardHeader>
            <header className="bg-background">
              <div className="mx-auto max-w-2xl px-4 py-8">
                <Image src={Logo} alt="logo" width={40} height={40}></Image>
                <h1 className="text-3xl font-bold tracking-tight font-secondary">
                  Your profile
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Update your display name and avatar. The avatar image is used
                  in the navbar and on events you create.
                </p>
              </div>
            </header>
          </CardHeader>

          <form>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar size="lg">
                  <AvatarImage
                    src={user?.image || undefined}
                    alt={user?.name}
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback>
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate font-medium">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Display name</Label>
                <Input id="name" name="name" placeholder="Your name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Avatar image URL</Label>
                <Input
                  id="image"
                  name="image"
                  type="text"
                  placeholder="https://example.com/your-image.jpg"
                />
              </div>
            </CardContent>

            <CardFooter className="gap-3">
              <Button
                type="submit"
                size="lg"
                className="btn-gradient cursor-pointer"
              >
                Save changes
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="cursor-pointer"
                nativeButton={false}
                render={<Link href="/" />}
              >
                Back to home
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}

export default ProfilePage;
