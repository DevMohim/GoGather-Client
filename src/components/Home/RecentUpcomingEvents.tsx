import { IEvent } from "@/types/Events.type";
import { ArrowRight, Compass, PlusCircle } from "lucide-react";
import Link from "next/link";
import EventCard from "../shared/EventCard";
import { Button } from "../ui/button";

const RecentUpcomingEvents = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upcoming-events`);
  const upcomingEvents = (await res.json()) as IEvent[];

  //   arrage data by nearest date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sortedEvents = Array.isArray(upcomingEvents)
    ? upcomingEvents
        .filter((event) => new Date(`${event.eventDate}T00:00:00`) >= today)
        .sort((a, b) => {
          const dateA = new Date(`${a.eventDate}T00:00:00`).getTime();
          const dateB = new Date(`${b.eventDate}T00:00:00`).getTime();

          return dateA - dateB;
        })
    : [];

  return (
    <section className="bg-dark py-10 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white font-secondary sm:text-4xl">
              Recent upcoming events
            </h2>
            <p className="mt-3 text-muted-foreground">
              The next gatherings on the calendar, sorted by the date closest to
              today.
            </p>
          </div>

          <Link
            href="/upcoming-event"
            className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors text-white"
          >
            View all events
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {sortedEvents.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {sortedEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="relative isolate mt-12 flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
            {/* Soft glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 left-1/2 -z-10 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
            />

            <span className="flex size-16 items-center justify-center rounded-2xl bg-muted ring-1 ring-foreground/10">
              <Compass className="size-7 text-muted-foreground" />
            </span>

            <h3 className="mt-6 text-xl font-semibold tracking-tight font-secondary">
              Nothing on the horizon, yet
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The calendar is quiet for now. Check back soon, or be the one to
              start gathering.
            </p>

            <Link href="/create-event" className="mt-8">
              <Button className="btn-gradient cursor-pointer">
                <PlusCircle className="mr-2 size-4" />
                Create an event
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentUpcomingEvents;
