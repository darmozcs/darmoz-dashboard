import { createFileRoute } from "@tanstack/react-router";
import { Permissions } from "@/pages/Permissions.page";

export const Route = createFileRoute("/_auth/permissions")({
  component: Permissions,
});
