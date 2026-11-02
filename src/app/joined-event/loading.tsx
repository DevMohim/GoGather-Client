import { Skeleton } from "@/components/ui/skeleton";

const JoinedEventCardSkeleton = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/10">
      {/* Image area */}
      <div className="relative aspect-video">
        <Skeleton className="h-full w-full rounded-none" />

        {/* Date plate */}
        <Skeleton className="absolute top-4 left-4 h-16 w-14 rounded-2xl" />

        {/* Event type pill */}
        <Skeleton className="absolute top-4 right-4 h-6 w-20 rounded-full" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-5 p-6">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Description (2 lines) */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Meta rows */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <Skeleton className="size-3.5 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="size-3.5 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="px-6 pb-6">
        <Skeleton className="h-8 w-32 rounded-lg" />
      </div>
    </div>
  );
};

export default JoinedEventCardSkeleton;
