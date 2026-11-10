import { createFileRoute } from "@tanstack/react-router";
import { WaPhoneNumbers } from "@/pages/WaPhoneNumbers.page";

export const Route = createFileRoute("/_auth/whatsapp/numbers")({
  component: WaPhoneNumbers,
});
