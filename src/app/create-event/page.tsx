'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Logo from '@/assest/logo.png'
import Image from "next/image";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useSession } from "@/lib/auth-client";


const today = new Date()
const minDate = [
  today.getFullYear(),
   String(today.getMonth() + 1 ).padStart(2,'0'),
   String(today.getDate()).padStart(2,'0'),
].join('-')

const CreateEventPage = () => {
   const {data :  session } = useSession()
   const user = session?.user

   const handleCreateEvent = async(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const form = e.currentTarget
      const formData = new FormData(form)
      const eventDate = formData.get('eventDate')
   
      if (typeof eventDate === 'string' && eventDate < minDate) {
         return;
      }
      const EventData = Object.fromEntries(formData.entries())
      const newEventData = {
         ...EventData,
          eventCreatorName : user?.name,
          eventCreatorEmail : user?.email,
          eventCreatorImage: user?.image
      }




      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events` , {
         method : "POST",
         headers : {
            "Content-Type" : "application/json"
         },
         body : JSON.stringify(newEventData)
      });
      if(!res.ok) {
         console.log('create new events failed due to api error')
      }
      const postRes = await res.json()
      if(postRes){
         toast.success("Event Added Successfully")
         form.reset()
         redirect('/upcoming-event')
      }
      console.log(postRes)
   }





  return (
    <div className="min-h-screen bg-bg">
      <main className="mx-auto max-w-3xl px-4 py-10">
        <Card>
          <CardHeader>
            <header className=" bg-background">
              <div className="mx-auto max-w-3xl px-4 py-8">
                <Image src={Logo} alt="logo" width={40} height={40}></Image>
                <h1 className="text-3xl font-bold tracking-tight font-secondary">
                  Create a new event
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Add the details below and publish your event for others to
                  discover.
                </p>
              </div>
            </header>
          </CardHeader>
          <form onSubmit={handleCreateEvent}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Event title *</Label>
                <Input
                  id="title"
                  name="eventTitle"
                  placeholder="e.g. Dhaka Tech Meetup 2026"
                  required
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="type">
                    Event type <span className="text-red-600">*</span>
                  </Label>
                  <Select name="eventType">
                    <SelectTrigger id="type" className="w-full">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clean-up">Clean up</SelectItem>
                      <SelectItem value="plantation">Plantation</SelectItem>
                      <SelectItem value="donation">Donation</SelectItem>
                      <SelectItem value="blood-donation">Blood Donation</SelectItem>
                      <SelectItem value="winter-relief">Winter Relief</SelectItem>
                      <SelectItem value="education">Free Education</SelectItem>
                      <SelectItem value="chariy">Charity</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">
                    Event date <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="date"
                    name="eventDate"
                    min={minDate}
                    type="date"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">
                  Location / Venue <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="location"
                  name="eventLocation"
                  placeholder="e.g. Bangabandhu International Conference Center, Dhaka"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail image URL</Label>
                <Input
                  id="thumbnail"
                  name="thumbnailImage"
                  type="url"
                  placeholder="https://example.com/event-banner.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Event description <span className="text-red-600">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="eventDescription"
                  placeholder="Tell people what this event is about, who should attend, and what to expect."
                  className="min-h-32"
                  required
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                size="lg"
                className="w-full btn-gradient cursor-pointer"
              >
                Publish event
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default CreateEventPage;
