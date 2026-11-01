"use client";
import { Button } from "../ui/button";
import { CalendarDays, Mail, MapPin, Ticket } from "lucide-react";
import { IEvent } from "@/types/Events.type";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "@/lib/auth-client";
import { normalizeAvatarUrl } from "@/lib/avatar";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

type JoinedUser = {
  email?: string;
  [key: string]: unknown;
};

const JoinedButton = ({ eventInfo }: { eventInfo: IEvent }) => {
  const [joinedUsers, setJoinedUsers] = useState<JoinedUser[]>([]);
  const [isJoining, setIsJoining] = useState(false);

  const { data: session } = useSession();
  const userInfo = session?.user;

  const formattedDate = new Date(eventInfo.eventDate).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const creatorInitials = eventInfo.eventCreatorName
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  useEffect(() => {
    let cancelled = false;

    const loadJoinedUsers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${eventInfo._id}`,
        );
        if (!res.ok) throw new Error("Could not load joined users");

        const data: JoinedUser[] = await res.json();
        if (!cancelled) setJoinedUsers(data);
      } catch (error) {
        console.error("Could not load joined users:", error);
      }
    };

    loadJoinedUsers();
    return () => {
      cancelled = true;
    };
  }, [eventInfo._id]);

  const joinedCount = joinedUsers.length;

  const alreadyJoined = joinedUsers.some(
    (user) => user.email && user.email === userInfo?.email,
  );

  const handleJoinEvent = async () => {
    if (!userInfo) {
      toast.error("Please login to join this event");
      return;
    }

    const { _id, ...eventData } = eventInfo;
    const joinedData = {
      ...eventData,
      eventId: _id,
      userId: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      image: normalizeAvatarUrl(userInfo.image),
      joinDate : new Date()
    };

    try {
      setIsJoining(true);
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

      setJoinedUsers((prev) => [...prev, joinedData]);
      toast.success("Joined successful");
    } catch (error) {
      console.error("Event Joined failed:", error);
      toast.error("Joined failed");
    } finally {
      setIsJoining(false);
    }
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
            {joinedCount === 0
              ? "Be the first to join this event"
              : `${joinedCount} ${joinedCount === 1 ? "person has" : "people have"} joined this event`}
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
            disabled={alreadyJoined || isJoining}
          >
            <Ticket className="mr-2 h-5 w-5" />
            {alreadyJoined ? "Joined" : isJoining ? "Joining..." : "Join event"}
          </Button>
          <div className="space-y-6 lg:sticky lg:top-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Event creator</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src={normalizeAvatarUrl(eventInfo.eventCreatorImage)}
                  />
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
