import { createFileRoute } from "@tanstack/react-router";
import { AuthGuardContainer } from "@/modules/auth/guards/AuthGuardContainer.container";

export const Route = createFileRoute("/_auth")({
  component: AuthGuardContainer,
});
