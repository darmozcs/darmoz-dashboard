import { createFileRoute } from "@tanstack/react-router";
import { WaBots } from "@/pages/WaBots.page";

export const Route = createFileRoute("/_auth/whatsapp/bots/")({
  component: WaBots,
});
