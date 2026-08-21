import { createFileRoute } from "@tanstack/react-router";
import { EmailTemplates } from "@/pages/EmailTemplates.page";

export const Route = createFileRoute("/_auth/mail/templates")({
  component: EmailTemplates,
});
