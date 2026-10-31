import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { IEvent } from "@/types/Events.type";
import { Button } from "@/components/ui/button";


const EventCard = ({ event }: { event: IEvent }) => {
  const parsedDate = new Date(`${event.eventDate}T00:00:00`);
  const isValidDate = !Number.isNaN(parsedDate.getTime());

  const month = isValidDate
    ? new Intl.DateTimeFormat("en-US", { month: "short" }).format(parsedDate)
    : "TBD";
  const day = isValidDate ? parsedDate.getDate() : "--";
  const fullDate = isValidDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(parsedDate)
    : "Date to be announced";

  const hasThumbnail = Boolean(event.thumbnailImage?.trim());

  return (
    <article className="group relative isolate flex flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/10 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_oklch(0_0_0/0.45)] hover:ring-foreground/20">
      {/* Ambient glow revealed on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 -z-10 size-56 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Image — top of the card, clean and un-scrimmed */}
      <div className="relative aspect-video overflow-hidden">
        {hasThumbnail ? (
          <Image
            src={event.thumbnailImage}
            alt={event.eventTitle}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.93_0.01_260),oklch(0.85_0.02_280)_60%,oklch(0.78_0.03_290))]" />
        )}

        {/* Date plate — floats over the image */}
        <div className="absolute top-4 left-4 flex w-14 flex-col items-center rounded-2xl border border-white/25 bg-background/75 py-2 backdrop-blur-md transition-colors duration-300 group-hover:border-white/50">
          <span className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            {month}
          </span>
          <span className="font-heading text-2xl leading-none font-semibold tracking-tight">
            {day}
          </span>
        </div>

        {/* Event type — floats over the image */}
        {event.eventType ? (
          <span className="absolute top-4 right-4 inline-flex items-center rounded-full border border-white/25 bg-background/75 px-3 py-1 text-[11px] font-medium tracking-wide text-foreground uppercase backdrop-blur-md transition-colors duration-300 group-hover:border-white/50">
            {event.eventType}
          </span>
        ) : null}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-5 p-6">
        <h3 className="font-heading text-lg leading-snug font-semibold tracking-tight">
          <span className="relative">
            {event.eventTitle}
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px w-0 bg-foreground/40 transition-all duration-500 group-hover:w-full"
            />
          </span>
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {event.eventDescription}
        </p>

        {/* Meta */}
        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <CalendarDays className="size-3.5 shrink-0" />
            <span>{fullDate}</span>
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">{event.eventLocation}</span>
          </li>
        </ul>

        {/* Host
        <div className="mt-auto flex items-center gap-3 border-t border-border/60 pt-4">
          <span
            aria-hidden
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-primary-foreground",
              "bg-linear-to-br from-primary via-primary/85 to-primary/60"
            )}
          >
            {getInitials(event.eventCreatorName)}
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-medium">
              {event.eventCreatorName}
            </span>
            <span className="text-xs text-muted-foreground">Hosted by</span>
          </span>
        </div> */}
      </div>

      {/* View details */}
      <div className="px-6 pb-6">
        <Button
          size="lg"
          className="w-full rounded-full gap-2 px-6 btn-gradient cursor-pointer"
          aria-label={`View details for ${event.eventTitle}`}
        >
          View Details
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            data-icon="inline-end"
          />
        </Button>
      </div>
    </article>
  );
};

export default EventCard;
