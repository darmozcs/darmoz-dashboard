import { createFileRoute } from "@tanstack/react-router";
import { WaIntegrations } from "@/pages/WaIntegrations.page";

export const Route = createFileRoute("/_auth/whatsapp/integrations")({
  component: WaIntegrations,
});
