
import { notFound } from "next/navigation";
import { CalendarDays, Mail, MapPin, Ticket } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { IEvent } from "@/types/Events.type";
import BacktoHomepageBtn from "@/components/shared/BacktoHomepageBtn";

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`);

  if (!res.ok) notFound();

  const eventInfo: IEvent = await res.json();

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

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <BacktoHomepageBtn />

        {/* Big thumbnail image */}
        <div className="mt-6 overflow-hidden rounded-2xl border bg-muted">
          {eventInfo.thumbnailImage ? (
            <Image
              src={eventInfo.thumbnailImage}
              alt={eventInfo.eventTitle}
              width={500}
              height={500}
              className="h-72 w-full object-cover sm:h-112"
            />
          ) : (
            <div className="flex h-72 items-center justify-center text-muted-foreground sm:h-112">
              No thumbnail available
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Left: event info */}
          <div className="lg:col-span-2">
            <Badge variant="secondary" className="capitalize">
              {eventInfo.eventType}
            </Badge>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
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
          <div>
            <div className="space-y-6 lg:sticky lg:top-6">
              <Button size="lg" className="w-full btn-gradient cursor-pointer">
                <Ticket className="mr-2 h-5 w-5" />
                Join event
              </Button>

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
      </div>
    </div>
  );
};

export default EventDetailsPage;
