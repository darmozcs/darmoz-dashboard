import { createFileRoute } from "@tanstack/react-router";
import { Audit } from "@/pages/Audit.page";

export const Route = createFileRoute("/_auth/audit")({
  component: Audit,
});
