import { createFileRoute } from "@tanstack/react-router";
import { WaConversations } from "@/pages/WaConversations.page";

export const Route = createFileRoute("/_auth/whatsapp/conversations")({
  component: WaConversations,
});
