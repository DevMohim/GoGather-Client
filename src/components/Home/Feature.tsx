import { CalendarPlus, LayoutDashboard, Ticket, Users } from "lucide-react";
import React from "react";

const features = [
  {
    icon: CalendarPlus,
    title: "Create events in minutes",
    description:
      "Add a title, date, venue, thumbnail and description, then publish your event for everyone to see.",
    accent: "from-emerald-500 to-teal-400",
  },
  {
    icon: Ticket,
    title: "One-click joining",
    description:
      "Found something you like? Join with a single click and find it later in your joined events.",
    accent: "from-sky-500 to-cyan-400",
  },
  {
    icon: Users,
    title: "See who is attending",
    description:
      "Every event shows how many people have joined, so you know what is popular before you go.",
    accent: "from-violet-500 to-fuchsia-400",
  },
  {
    icon: LayoutDashboard,
    title: "Manage your own events",
    description:
      "Edit details or delete the events you created from one simple management page.",
    accent: "from-amber-500 to-orange-400",
  },
];

const Features = () => {
  return (
    <section className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight font-secondary sm:text-4xl">
            Everything you need to host and join events
          </h2>
          <p className="mt-4 text-muted-foreground">
            From creating your first event to keeping track of the ones you
            joined, it all happens in one place.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description, accent }) => (
            <article
              key={title}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-card p-7 ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-foreground/20"
            >
              {/* Top accent line */}
              <div
                aria-hidden
                className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${accent} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
              />

              {/* Icon */}
              <div
                className={`flex size-14 items-center justify-center rounded-2xl bg-linear-to-br ${accent} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
              >
                <Icon className="size-7" />
              </div>

              <h3 className="mt-6 text-lg font-semibold leading-snug tracking-tight">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
