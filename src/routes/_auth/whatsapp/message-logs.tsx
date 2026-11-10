import { createFileRoute } from "@tanstack/react-router";
import { WaMessageLogs } from "@/pages/WaMessageLogs.page";

export const Route = createFileRoute("/_auth/whatsapp/message-logs")({
  component: WaMessageLogs,
});
