import BacktoHomepageBtn from '@/components/shared/BacktoHomepageBtn';
import MyEventCard from '@/components/shared/MyEventCard';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { IEvent } from '@/types/Events.type';
import { Compass, PlusCircle } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';

const ManageEventPage = async() => {
   const sessionData = await auth.api.getSession({
      headers: await headers()
   })
   const user = sessionData?.user
   console.log(user)

   const res = await fetch(
     `${process.env.NEXT_PUBLIC_API_URL}/my-events/${user?.email}`,
   );
   const myEvents = await res.json() as IEvent[]
   console.log(myEvents)
   
   return (
     <main className="relative overflow-hidden bg-bg">
       {/* back to homepage btn */}
       <BacktoHomepageBtn />

       {/* Headings */}
       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-8 py-4">
         <div>
           <h1 className="text-3xl font-bold tracking-tight font-secondary">
             Manage My Events
           </h1>
           <p className="mt-2 max-w-xl text-muted-foreground">
             View, edit, and delete the events you have created, and keep their
             details up to date in one place.
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
         {myEvents.length > 0 ? (
           <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
             {myEvents.map((event) => (
               <MyEventCard key={event._id} event={event} />
             ))}
           </div>
         ) : (
           <div className="mt-14 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card/40 px-6 py-20 text-center backdrop-blur">
             <span className="flex size-14 items-center justify-center rounded-2xl bg-muted/60">
               <Compass className="size-6 text-muted-foreground" />
             </span>
             <h3 className="font-heading mt-5 text-lg font-semibold tracking-tight">
               You do not have any event to manage. First creat an event.
             </h3>
           </div>
         )}
       </div>
     </main>
   );
};

export default ManageEventPage;