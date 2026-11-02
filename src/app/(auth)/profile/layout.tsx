import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "View and update your display name and avatar on GoGather.",
};

export default function ProfileLayout(props: LayoutProps<"/profile">) {
  return props.children;
}
