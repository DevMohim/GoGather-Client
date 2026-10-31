"use client";
import { Button } from "../ui/button";
import { CalendarDays, Mail, MapPin, Ticket } from "lucide-react";
import { IEvent } from "@/types/Events.type";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useState } from "react";

const JoinedButton = ({ eventInfo }: { eventInfo: IEvent }) => {
   const [joinedBtnClick, setJoinedBtnClick] =useState(false)
  const formattedDate = new Date(eventInfo.eventDate).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const { data: session } = useSession();
  const userInfo = session?.user;

  const creatorInitials = eventInfo.eventCreatorName
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const joinedData = {
    ...eventInfo,
    ...userInfo,
  };

  const handleJoinEvent = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/joined-events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(joinedData),
      },
    );
    if (!res.ok) {
      console.error("Event Joined failed:", res.status);
      toast.error("Joined failed");
      return;
    }

    setJoinedBtnClick(true)
    toast.success("Joined successful");
  };

  return (
    <>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left: event info */}
        <div className="lg:col-span-2">
          <Badge variant="secondary" className="capitalize">
            {eventInfo.eventType}
          </Badge>

          <p className="text-sm font-primary px-2 mt-2 font-semibold">
            3 people joined this event
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl font-secondary">
            {eventInfo.eventTitle}
          </h1>

          <div className="mt-5 flex flex-col gap-3 text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-6">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{eventInfo.eventLocation}</span>
            </div>
          </div>

          <Separator className="my-8" />

          <h2 className="text-xl font-semibold">About this event</h2>
          <p className="mt-3 whitespace-pre-line leading-7 text-muted-foreground">
            {eventInfo.eventDescription}
          </p>
        </div>

        {/* Right: join button + creator */}
        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full btn-gradient cursor-pointer disabled:cursor-not-allowed"
            onClick={handleJoinEvent}
            disabled={joinedBtnClick}
          >
            <Ticket className="mr-2 h-5 w-5" />
            {joinedBtnClick ? "Joined" : "Join event"}
          </Button>
          <div className="space-y-6 lg:sticky lg:top-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Event creator</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  {/* avatar image */}
                  <AvatarFallback className="text-lg font-semibold">
                    {creatorInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {eventInfo.eventCreatorName}
                  </p>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="truncate">
                      {eventInfo.eventCreatorEmail}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinedButton;
