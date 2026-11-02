import EventsPageSkeleton from "@/components/skeletons/UpcomingEventPageSkeleton";

const Loading = () => (
  <EventsPageSkeleton
    showFilters
    buttonVariant="full"
    label="Loading upcoming events"
  />
);

export default Loading;
