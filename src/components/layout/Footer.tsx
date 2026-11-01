import Image from "next/image";
import Link from "next/link";
import Logo from "@/assest/logo.png"

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming-event" },
  { label: "Create Event", href: "/create-event" },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black text-neutral-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 sm:px-6 md:flex-row md:justify-between lg:px-8">
        {/* Brand */}
        <div className="text-center md:text-left">
          <Link
            href="/"
            className=" text-xl font-bold tracking-tight text-white font-secondary flex items-center gap-2"
          >
            <Image src={Logo} alt="Footer Logo" width={40} height={40}></Image>
           GoGather
          </Link>
          <p className="mt-1 text-sm text-neutral-500">
            Discover, join and host events near you.
          </p>
        </div>

        {/* Links */}
        <nav
          aria-label="Footer"
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm"
        >
          {footerLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="transition-colors hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5 text-center text-sm text-neutral-500">
        &copy; {new Date().getFullYear()} GoGather. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
