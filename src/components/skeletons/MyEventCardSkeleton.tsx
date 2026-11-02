// MyEventCardSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

const MyEventCardSkeleton = () => {
  return (
    <article
      aria-hidden
      className="relative isolate flex flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-foreground/10"
    >
      {/* Image area */}
      <div className="relative aspect-video overflow-hidden">
        <Skeleton className="absolute inset-0 rounded-none" />
        {/* Date plate */}
        <Skeleton className="absolute top-4 left-4 h-[60px] w-14 rounded-2xl" />
        {/* Event type badge */}
        <Skeleton className="absolute top-4 right-4 h-6 w-20 rounded-full" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-5 p-6">
        {/* Title */}
        <Skeleton className="h-5 w-3/4" />

        {/* Description (2 lines) */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-5/6" />
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="size-3.5 rounded-sm" />
            <Skeleton className="h-3.5 w-36" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="size-3.5 rounded-sm" />
            <Skeleton className="h-3.5 w-44" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 px-6 pb-6">
        <Skeleton className="h-8 w-[118px] rounded-lg" />
        <Skeleton className="size-8 rounded-lg" />
        <Skeleton className="size-8 rounded-lg" />
      </div>
    </article>
  );
};

export default MyEventCardSkeleton;
