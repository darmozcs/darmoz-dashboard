import { createFileRoute } from "@tanstack/react-router";
import { ScheduledEmails } from "@/pages/ScheduledEmails.page";

export const Route = createFileRoute("/_auth/mail/scheduled-emails")({
  component: ScheduledEmails,
});
