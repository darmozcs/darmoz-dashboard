import { Navigate } from "@tanstack/react-router";
import { AuthGuard } from "./AuthGuard";
import { useAuthGuard } from "./useAuthGuard";
import { useTokenRefresh } from "../services/useTokenRefresh";
import { DashboardLayoutContainer } from "@/modules/layouts/containers";

export const AuthGuardContainer = () => {
  const { hasToken, isVerifying, isAuthenticated } = useAuthGuard();
  useTokenRefresh(isAuthenticated);

  if (!hasToken) return <Navigate to="/" />;
  if (isVerifying) return <AuthGuard />;
  if (isAuthenticated) return <DashboardLayoutContainer />;

  return null;
};
