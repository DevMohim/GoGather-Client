// app/.../manage-event/loading.tsx  (page.tsx যে folder-এ আছে সেখানে)
import MyEventCardSkeleton from "@/components/skeletons/MyEventCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <main className="relative overflow-hidden bg-bg">
      {/* Back button placeholder */}
      <div className="px-8 pt-4">
        <Skeleton className="h-9 w-40 rounded-lg" />
      </div>

      {/* Headings */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-8 py-4">
        <div className="w-full max-w-xl">
          <Skeleton className="h-9 w-72" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-4/5" />
        </div>
        <Skeleton className="h-10 w-full rounded-lg sm:w-40" />
      </div>

      {/* Cards grid */}
      <div className="container mx-auto px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <MyEventCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Loading;
