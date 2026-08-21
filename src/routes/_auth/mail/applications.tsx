import { createFileRoute } from "@tanstack/react-router";
import { MailClientApplications } from "@/pages/MailClientApplications.page";

export const Route = createFileRoute("/_auth/mail/applications")({
  component: MailClientApplications,
});
