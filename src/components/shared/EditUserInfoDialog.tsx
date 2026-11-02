"use client";
import { Button } from "@/components/ui/button";
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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser} from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import toast from "react-hot-toast";

type IUser = {
  user?: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
};

const EditUserInfoDialog = ({ user }: IUser) => {
  const router = useRouter();

  const handleUserUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const updatedUserData = Object.fromEntries(formData.entries());

    const result = await updateUser({
      ...updatedUserData,
    });
    if (result) {
      toast.success("User Info Update Successfull");
      router.refresh();
      router.push("/profile");
    }
  };

  return (
    <main>
      <Dialog>
        <DialogTrigger
          render={
            <Button
              type="button"
              size="lg"
              className="btn-gradient cursor-pointer"
            >
              Edit
            </Button>
          }
        />
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleUserUpdate}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className="mt-4">
              <Field>
                <Label htmlFor="name">Display name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  defaultValue={user?.name}
                />
              </Field>
              <Field>
                <Label htmlFor="image">Avatar image URL</Label>
                <Input
                  id="image"
                  name="image"
                  type="text"
                  placeholder="https://example.com/your-image.jpg"
                  defaultValue={user?.image || undefined}
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose
                render={
                  <Button
                    type="submit"
                    size="lg"
                    className="btn-gradient cursor-pointer"
                  >
                    Save changes
                  </Button>
                }
              />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default EditUserInfoDialog;
