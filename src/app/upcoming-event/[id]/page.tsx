
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { IEvent } from "@/types/Events.type";
import JoinedButton from "@/components/shared/JoinedButton";
import Link from "next/link";

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {

  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`);

  if (!res.ok) notFound();

  const eventInfo: IEvent = await res.json();



  return (
    <div className="min-h-screen bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="px-8 py-4">
          <Link
            href="/upcoming-event"
            className="inline-flex items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-primery text-[10px]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to upcoming events
          </Link>
        </div>

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

        <JoinedButton eventInfo={eventInfo} />
      </div>
    </div>
  );
};

export default EventDetailsPage;
