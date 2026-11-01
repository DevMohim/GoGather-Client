import EventCard from "@/components/shared/EventCard";
import {  Ticket, Compass, PlusCircle, } from "lucide-react";
import { IEvent } from "@/types/Events.type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BacktoHomepageBtn from "@/components/shared/BacktoHomepageBtn";

const UpcomingEventPage = async () => {


  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upcoming-events`);
  const events = (await res.json()) as IEvent[];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sortedEvents = Array.isArray(events)
    ? events
        .filter(
          (event) => new Date(`${event.eventDate}T00:00:00`) >= today
        )
        .sort((a, b) => {
          const dateA = new Date(`${a.eventDate}T00:00:00`).getTime();
          const dateB = new Date(`${b.eventDate}T00:00:00`).getTime();

          return dateA - dateB;
        })
    : [];
  const uniqueTypes = new Set(
    sortedEvents.map((event) => event.eventType?.trim()).filter(Boolean)
  );

  return (
    <main className="relative overflow-hidden bg-bg">
      {/* Hero
      <section className="container mx-auto px-4 pt-4 pb-14 sm:px-6 md:pt-10 md:pb-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="gap-2 rounded-full px-4 py-1.5 text-xs tracking-[0.16em] uppercase backdrop-blur"
          >
            <Sparkles className="size-3" />
            Handpicked gatherings
          </Badge>

          <h1 className="mt-6 text-4xl leading-[1.05] text-balance sm:text-5xl md:text-6xl bg-linear-to-r from-[#2A8A75] via-primery to-[#10483E] bg-clip-text font-bold tracking-tight text-transparent font-secondary">
            Gather somewhere{' '}
            <span className="bg-linear-to-r from-[#2A8A75] via-primery to-[#10483E] bg-clip-text font-bold tracking-tight text-transparent italic font-secondary">
              remarkable
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Find community events that bring support, opportunity, and hope to
            people in need.
          </p>

          <div>
            <Link href="/create-event">
              <Button className="mt-5 btn-gradient cursor-pointer w-sm">
                <PlusCircle /> Create Event
              </Button>
            </Link>
          </div>

          {nextEventDate ? (
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </span>
              Next gathering lands{" "}
              <span className="font-medium text-foreground">
                {nextEventDate}
              </span>
            </p>
          ) : null}
        </div>
      </section> */}

      {/* back to homepage btn */}
      <BacktoHomepageBtn />


      {/* Headings */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-8 py-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-secondary">
            Upcoming Events
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Discover upcoming events near you, from workshops and meetups to
            conferences, and reserve your spot before they fill up.
          </p>
        </div>
        <div>
          <Link href="/create-event">
            <Button
              size="lg"
              className="w-full sm:w-auto btn-gradient cursor-pointer"
            >
              <PlusCircle className="mr-2 h-5 w-5" /> Create Event
            </Button>
          </Link>
        </div>
      </div>

      {/* Catalog */}
      <section className="container mx-auto px-4 pb-24 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex w-full flex-wrap items-center justify-center gap-2">
            <span className="inline-flex h-8 items-center rounded-full bg-foreground px-4 text-xs font-semibold tracking-wide text-background uppercase">
              All
            </span>
            {Array.from(uniqueTypes).map((type) => (
              <span
                key={type}
                className="inline-flex h-8 items-center rounded-full border border-border/70 bg-background/60 px-4 text-xs font-medium tracking-wide text-muted-foreground uppercase backdrop-blur transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {sortedEvents.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {sortedEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="mt-14 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card/40 px-6 py-20 text-center backdrop-blur">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-muted/60">
              <Compass className="size-6 text-muted-foreground" />
            </span>
            <h3 className="font-heading mt-5 text-lg font-semibold tracking-tight">
              Nothing on the horizon — yet
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              The calendar is quiet for now. Check back soon, or be the one to
              start gathering.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-4 py-2 text-xs font-semibold tracking-wide uppercase">
              <Ticket className="size-3.5" />
              Fresh events incoming
            </span>
          </div>
        )}
      </section>
    </main>
  );
};

export default UpcomingEventPage;
