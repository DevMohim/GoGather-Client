import EventCardSkeleton from "@/components/skeletons/EventCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  showFilters?: boolean; // Upcoming পেজে true, Joined পেজে false
  buttonVariant?: "full" | "compact";
  count?: number;
  label?: string;
};

const EventsPageSkeleton = ({
  showFilters = false,
  buttonVariant = "full",
  count = 6,
  label = "Loading events",
}: Props) => {
  return (
    <main
      className="relative overflow-hidden bg-bg"
      aria-busy="true"
      aria-label={label}
    >
      {/* Back to homepage */}
      <div className="px-8 pt-6">
        <Skeleton className="h-5 w-36" />
      </div>

      {/* Headings */}
      <div className="flex flex-col gap-4 px-8 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-4 w-96 max-w-full" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>
        <Skeleton className="h-10 w-full rounded-lg sm:w-40" />
      </div>

      <section className="container mx-auto px-4 pb-24 sm:px-6 lg:px-8">
        {/* Filter chips (শুধু Upcoming পেজে) */}
        {showFilters && (
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border/60 pb-6">
            {[56, 88, 96, 80, 104].map((width, index) => (
              <Skeleton
                key={index}
                className="h-8 rounded-full"
                style={{ width }}
              />
            ))}
          </div>
        )}

        {/* Cards grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {Array.from({ length: count }).map((_, index) => (
            <EventCardSkeleton key={index} buttonVariant={buttonVariant} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default EventsPageSkeleton;
