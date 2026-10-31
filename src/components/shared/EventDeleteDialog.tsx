import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { IEvent } from "@/types/Events.type";
import toast from "react-hot-toast";

const EventDeleteDialog = ({ event }: { event: IEvent }) => {
  const router = useRouter();
  const handleEventDelete = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${event._id}`,
      {
        method: "DELETE",
      },
    );
    if (!res.ok) {
      console.log("Event API fetch failed");
    }
    const data = await res.json();
    if (data) {
      toast.success("Event delete successfull");
      router.refresh();
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <Button
              size="sm"
              className="rounded-full gap-2 px-6 cursor-pointer"
              variant="destructive"
              aria-label={`View details for ${event.eventTitle}`}
            >
              <Trash /> Delete
            </Button>
          }
        >
          Show Dialog
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <span>
              <TriangleAlert className="text-red-600" />
            </span>
            <AlertDialogTitle>Delete?</AlertDialogTitle>

            <AlertDialogDescription>
              This will permanently delete your
              event from database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              variant="destructive"
              onClick={handleEventDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EventDeleteDialog;
