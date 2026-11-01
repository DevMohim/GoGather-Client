"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

import { IEvent } from "@/types/Events.type";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormEvent } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import { FieldGroup } from "../ui/field";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Pen } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const today = new Date();
const minDate = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0"),
].join("-");

const EventEditDialog = ({ event }: { event: IEvent }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  const handleEventEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = getTokenFromClient()

    const formData = new FormData(e.currentTarget);
    const eventDate = formData.get("eventDate");

    if (typeof eventDate === "string" && eventDate < minDate) {
      return;
    }

    const editedData = {
      ...Object.fromEntries(formData.entries()),
      eventCreatorName: user?.name,
      eventCreatorEmail: user?.email,
      eventCreatorImage: user?.image,
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${event._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedData),
        },
      );

      if (!res.ok) {
        console.error("Event update failed:", res.status);
        toast.error("Event update failed");
        return;
      }

      toast.success("Event update successful");
      router.refresh();
    } catch (error) {
      console.error("Event update request failed:", error);
      toast.error("Could not update event");
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            size="sm"
            className=" rounded-full gap-2 px-4 btn-gradient cursor-pointer"
            aria-label={`View details for ${event.eventTitle}`}
          >
            <Pen /> Edit
          </Button>
        }
      />

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEventEdit}>
          <FieldGroup>
            <div className="space-y-2">
              <Label htmlFor="title">Event title *</Label>
              <Input
                id="title"
                name="eventTitle"
                placeholder="e.g. Dhaka Tech Meetup 2026"
                required
                defaultValue={event.eventTitle}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type">
                  Event type <span className="text-red-600">*</span>
                </Label>
                <Select name="eventType" defaultValue={event.eventType}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clean-up">Clean up</SelectItem>
                    <SelectItem value="plantation">Plantation</SelectItem>
                    <SelectItem value="donation">Donation</SelectItem>
                    <SelectItem value="blood-donation">
                      Blood Donation
                    </SelectItem>
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
                  defaultValue={event.eventDate}
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
                defaultValue={event.eventLocation}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail image URL</Label>
              <Input
                id="thumbnail"
                name="thumbnailImage"
                type="url"
                placeholder="https://example.com/event-banner.jpg"
                defaultValue={event.thumbnailImage}
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
                className="min-h-24"
                required
                defaultValue={event.eventDescription}
              />
            </div>
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={
                <Button type="submit" className="btn-gradient cursor-pointer">
                  Save changes
                </Button>
              }
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventEditDialog;
