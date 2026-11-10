import { createFileRoute } from "@tanstack/react-router";
import { WaAccounts } from "@/pages/WaAccounts.page";

export const Route = createFileRoute("/_auth/whatsapp/accounts")({
  component: WaAccounts,
});
