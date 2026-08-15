import { createFileRoute } from "@tanstack/react-router";
import { User } from "@/pages/User.page";

export const Route = createFileRoute("/_auth/user")({
  component: User,
});
