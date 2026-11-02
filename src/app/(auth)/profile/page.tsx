"use client";

import Image from "next/image";
import Logo from "@/assest/logo.png";
import { useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EditUserInfoDialog from "@/components/shared/EditUserInfoDialog";

const ProfilePage = () => {
  const { data: session} = useSession();
  const user = session?.user;


  

  return (
    <div className="min-h-screen bg-bg">
      <main className="mx-auto max-w-2xl px-4 py-10">
        <Card>
          <CardHeader>
            <header>
              <div className="mx-auto max-w-2xl px-4 py-8 flex justify-between">
                <div>
                  <Image src={Logo} alt="logo" width={40} height={40}></Image>
                  <h1 className="text-3xl font-bold tracking-tight mt-1 font-secondary">
                    Your profile
                  </h1>
                  <p className=" text-muted-foreground mt-4">
                    Update your display name and avatar. The avatar image is
                    used in the navbar and on events you create.
                  </p>
                </div>

                <div>
                  <EditUserInfoDialog user={user}/>
                </div>
              </div>
            </header>
          </CardHeader>

          
            <CardContent className="space-y-6">
              <div>
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
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground tracking-wide" >Name : </p>
                <h1 className="text-lg font-semibold font-secondary tracking-wider text-card-foreground">{user?.name}</h1>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground tracking-wide">Your Email : </p>
                <h1 className="text-lg font-semibold font-secondary tracking-wide text-card-foreground">{user?.email}</h1>
              </div>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default ProfilePage;
