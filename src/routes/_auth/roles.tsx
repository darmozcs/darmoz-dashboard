import { createFileRoute } from "@tanstack/react-router";
import { Roles } from "@/pages/Roles.page";

export const Route = createFileRoute("/_auth/roles")({
  component: Roles,
});
