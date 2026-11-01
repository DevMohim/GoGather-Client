import BacktoHomepageBtn from '@/components/shared/BacktoHomepageBtn';
import JoinedEventCard from '@/components/shared/JoinedEventCard';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { getTokenFromServer } from '@/lib/getTokenFromServer';
import { IJoinEvent } from '@/types/JoinEvent.type';
import { Compass, PlusCircle } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';

const JoinedEventPage = async () => {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });
  const user = sessionData?.user;
  const token = getTokenFromServer()

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-joined-events/${user?.email}`,{
      headers: {
        authorization : `Bearer ${token}`
      }
    }
  );
  const myEvents = (await res.json()) as IJoinEvent[];
  console.log('my joined events',myEvents)

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sortedEvents = Array.isArray(myEvents)
    ? myEvents
        .filter((event) => new Date(`${event.eventDate}T00:00:00`) >= today)
        .sort((a, b) => {
          const dateA = new Date(`${a.eventDate}T00:00:00`).getTime();
          const dateB = new Date(`${b.eventDate}T00:00:00`).getTime();

          return dateA - dateB;
        })
    : [];

  return (
    <main className="relative overflow-hidden bg-bg">
      {/* back to homepage btn */}
      <BacktoHomepageBtn />

      {/* Headings */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-8 py-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-secondary">
            My Joined Events
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Here all event will show that I join.
          </p>
        </div>
        <div>
          <Link href="/create-event">
            <Button
              size="lg"
              className="w-full sm:w-auto btn-gradient cursor-pointer"
            >
              <PlusCircle className="mr-2 h-5 w-5" /> Create Event
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-24 sm:px-6 lg:px-8">
        {sortedEvents.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {sortedEvents.map((event) => (
              <JoinedEventCard
                key={String(event._id)}
                event={event}
              />
            ))}
          </div>
        ) : (
          <div className="mt-14 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card/40 px-6 py-20 text-center backdrop-blur">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-muted/60">
              <Compass className="size-6 text-muted-foreground" />
            </span>
            <h3 className="font-heading mt-5 text-lg font-semibold tracking-tight">
              You do not have any joined event. First create an event.
            </h3>

            <div className="mt-5">
              <Link href="/create-event">
                <Button
                  size="lg"
                  className="w-full sm:w-auto btn-gradient cursor-pointer"
                >
                  <PlusCircle className="mr-2 h-5 w-5" /> Create Event
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default JoinedEventPage;