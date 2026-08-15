import { useEffect } from "react";
import { Navigate } from "@tanstack/react-router";
import { LoginFormContainer } from "@/modules/auth/containers";

export const Login = () => {
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      window.history.replaceState(null, "", "/dashboard");
    }
  }, [accessToken]);

  if (accessToken) return <Navigate to="/dashboard" replace />;

  return <LoginFormContainer />;
};
