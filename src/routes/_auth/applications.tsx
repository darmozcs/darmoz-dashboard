import { createFileRoute } from "@tanstack/react-router";
import { Applications } from "@/pages/Applications.page";

export const Route = createFileRoute("/_auth/applications")({
  component: Applications,
});
