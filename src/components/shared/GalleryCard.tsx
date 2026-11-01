import { CalendarCheck, MapPin, Users } from "lucide-react";
import Image from "next/image";

interface IGalleryItem {
  image: string;
  tag: string;
  title: string;
  location: string;
  completedDate: string;
  participants: number;
  featured?: boolean;
}

const formatDate = (date: string) => {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
};

const GalleryCard = ({ event }: { event: IGalleryItem }) => {
  return (
    <article className="group relative isolate h-full w-full overflow-hidden rounded-3xl bg-neutral-900 ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-1 hover:ring-emerald-400/40 hover:shadow-[0_24px_60px_-24px_rgba(16,185,129,0.35)]">
      {/* Background image */}
      <Image
        src={event.image}
        alt={event.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Gradient for text legibility */}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/90 via-black/30 to-black/10" />

      {/* Top row: tag + participants */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
        <span className="rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase shadow-lg">
          {event.tag}
        </span>

        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
          <Users className="size-3.5 text-emerald-400" />
          {event.participants}
        </span>
      </div>

      {/* Bottom glass panel */}
      <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/15 bg-black/45 p-4 backdrop-blur-md transition-colors duration-300 group-hover:border-white/30">
        <h3 className="text-xl leading-tight font-bold tracking-tight text-white">
          {event.title}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-white/80">
          <p className="flex items-center gap-1.5">
            <MapPin className="size-4 shrink-0 text-emerald-400" />
            <span>{event.location}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <CalendarCheck className="size-4 shrink-0 text-emerald-400" />
            <span>{formatDate(event.completedDate)}</span>
          </p>
        </div>

        <p className="mt-3 border-t border-white/10 pt-3 text-xs text-white/60">
          <span className="font-semibold text-emerald-400">
            {event.participants}
          </span>{" "}
          people participated in this event
        </p>
      </div>
    </article>
  );
};

export default GalleryCard;
