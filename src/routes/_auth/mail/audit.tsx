import { createFileRoute } from "@tanstack/react-router";
import { MailAudit } from "@/pages/MailAudit.page";

export const Route = createFileRoute("/_auth/mail/audit")({
  component: MailAudit,
});
