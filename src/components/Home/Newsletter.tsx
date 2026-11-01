import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  return (
    <section className="bg-dark px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 px-6 py-14 text-center sm:px-12 md:py-20">
        {/* Soft glow background */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -bottom-24 -z-10 size-72 rounded-full bg-teal-400/10 blur-3xl"
        />

        {/* Icon */}
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-emerald-300 backdrop-blur-md">
          <Mail className="size-6" />
        </div>

        <h2 className="mt-6 text-3xl font-bold tracking-tight text-white font-secondary sm:text-4xl md:text-5xl">
          Never miss an event
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-400 sm:text-lg">
          Subscribe to our newsletter and get new and upcoming events delivered
          straight to your inbox, once a week.
        </p>

        {/* Form */}
        <form className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            placeholder="Enter your email address"
            className="h-12 flex-1 rounded-xl border-white/15 bg-white/5 px-4 text-white placeholder:text-neutral-500 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/30"
          />
          <Button
            type="submit"
            size="lg"
            className="btn-gradient h-12 cursor-pointer rounded-xl px-6"
          >
            Subscribe
            <Send className="ml-2 size-4" />
          </Button>
        </form>

        <p className="mt-4 text-sm text-neutral-500">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
