import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/assest/logo.png";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming-event" },
  { label: "Create Event", href: "/create-event" },
  { label: "Manage My Events", href: "/manage-event" },
  { label: "Joined Events", href: "/joined-event" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com/gogather",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/gogather",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/gogather",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="relative isolate overflow-hidden bg-black text-neutral-400">
      {/* Background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/4 -z-10 size-112 rounded-full bg-emerald-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/3 -z-10 size-80 rounded-full bg-orange-500/10 blur-3xl"
      />

      {/* Top gradient line */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-emerald-400/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={Logo}
                alt="GoGather logo"
                className="size-11 object-contain"
              />
              <span className="flex flex-col leading-tight">
                <span className="text-2xl font-bold tracking-tight text-white">
                  GoGather
                </span>
                <span className="text-[8px] font-medium tracking-[0.18em] text-neutral-500 uppercase">
                  Good Things Gather
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Discover community events near you, join the ones you care about,
              or host your own and bring people together.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-neutral-300 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-emerald-500/15 hover:text-emerald-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Explore" className="lg:col-span-3 lg:col-start-6">
            <h3 className="text-sm font-semibold text-white">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {exploreLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1 transition-colors hover:text-emerald-300"
                  >
                    {label}
                    <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          
          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white">Contact us</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                <a
                  href="mailto:hello@gogather.com"
                  className="transition-colors hover:text-emerald-300"
                >
                  gogather@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                <a
                  href="tel:+8801000000000"
                  className="transition-colors hover:text-emerald-300"
                >
                  +880 1000-000000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-sm text-neutral-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} GoGather. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Giant faded wordmark */}
      
    </footer>
  );
};

export default Footer;