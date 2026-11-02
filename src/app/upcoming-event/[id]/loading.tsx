import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading skeleton for the event details page (/upcoming-event/[id]).
 * Mirrors the real layout: back link → thumbnail → info grid
 * (left: badge, joined count, title, meta, about section;
 *  right: join button + event creator card).
 */
const EventDetailsSkeleton = () => {
  return (
    <div
      className="min-h-screen bg-muted/40"
      aria-busy="true"
      aria-label="Loading event details"
    >
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Back to upcoming events */}
        <div className="px-8 py-4">
          <div className="inline-flex items-center gap-1.5">
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-3 w-36" />
          </div>
        </div>

        {/* Big thumbnail image */}
        <div className="mt-6 overflow-hidden rounded-2xl border bg-muted">
          <Skeleton className="h-72 w-full rounded-none sm:h-112" />
        </div>

        {/* Event info + join sidebar */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Left: event info */}
          <div className="lg:col-span-2">
            {/* Event type badge */}
            <Skeleton className="h-5 w-24 rounded-full" />

            {/* Joined count */}
            <Skeleton className="mt-2 h-4 w-64 max-w-full" />

            {/* Title */}
            <Skeleton className="mt-3 h-9 w-3/4 sm:h-10" />

            {/* Date & location */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
              <div className="flex items-center gap-2">
                <Skeleton className="size-5 rounded-full" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="size-5 rounded-full" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>

            {/* Separator */}
            <div className="my-8 h-px w-full bg-border" />

            {/* About this event */}
            <Skeleton className="h-6 w-48" />
            <div className="mt-3 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>

          {/* Right: join button + creator card */}
          <div className="space-y-3">
            {/* Join event button */}
            <Skeleton className="h-9 w-full rounded-lg" />

            {/* Event creator card */}
            <div className="rounded-xl bg-card p-4 ring-1 ring-foreground/10">
              <Skeleton className="h-4 w-32" />
              <div className="mt-4 flex items-center gap-4">
                <Skeleton className="size-14 rounded-full" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="size-4 rounded-full" />
                    <Skeleton className="h-4 w-44 max-w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsSkeleton;
