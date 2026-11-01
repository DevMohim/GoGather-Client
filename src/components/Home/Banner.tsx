import {
  ArrowRight,
  CalendarDays,
  PlusCircle,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const stats = [
  { icon: CalendarDays, value: "100+", label: "Events hosted" },
  { icon: Users, value: "50K+", label: "People joined" },
];

const Banner = () => {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1920&auto=format&fit=crop"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />

      {/* Overlays for text legibility */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-slate-950/95 via-slate-950/80 to-slate-950/50" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-20 bg-linear-to-t from-slate-950 to-transparent" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-8 sm:px-6 md:py-12 lg:grid-cols-12 lg:px-8 lg:py-16">

        {/* Left: main content */}
        <div className="text-center lg:col-span-7 lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-md">
            <Sparkles className="size-4 text-emerald-300" />
            Handpicked gatherings
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight font-secondary sm:text-5xl md:text-6xl">
            Gather somewhere
            <span className="block text-white/70">remarkable.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg lg:mx-0">
            Find upcoming events near you, join the ones you love, or host your
            own and bring your community together.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link href="/create-event" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="btn-gradient w-full cursor-pointer sm:w-auto"
              >
                <PlusCircle className="mr-2 size-5" />
                Create Event
              </Button>
            </Link>

            <Link href="/upcoming-event" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full cursor-pointer border-white/30 bg-white/5 text-white backdrop-blur-md hover:bg-white/15 hover:text-white sm:w-auto"
              >
                Browse events
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right: stats card */}
        <div className="lg:col-span-5 lg:justify-self-end">
          <div className="grid grid-cols-2 gap-6 rounded-3xl border border-white/15 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-md sm:p-8 lg:min-w-[320px] lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-white/10">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-3 text-center lg:flex-row lg:gap-5 lg:py-6 lg:text-left lg:first:pt-0 lg:last:pb-0"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                  <Icon className="size-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {value}
                  </p>
                  <p className="text-sm font-medium text-slate-300">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
