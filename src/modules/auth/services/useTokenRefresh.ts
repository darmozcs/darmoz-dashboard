import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { config } from "@/config";
import { logoutService, refreshService } from "@/DAL/auth";
import { useUserStore } from "@/store";

export const useTokenRefresh = (isAuthenticated: boolean) => {
  const navigate = useNavigate();
  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.clearUser);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");

    if (!refreshToken || !accessToken) {
      clearUser();
      navigate({ to: "/" });
      return;
    }

    const refresh = async () => {
      const currentRefresh = localStorage.getItem("refreshToken");
      const currentAccess = localStorage.getItem("accessToken");

      if (!currentRefresh || !currentAccess) {
        clearUser();
        navigate({ to: "/" });
        return;
      }

      try {
        const response = await refreshService({ refreshToken: currentRefresh });
        const {
          accessToken: newAccess,
          refreshToken: newRefresh,
          userId,
          email,
          roles,
          permissions,
        } = response.data;
        localStorage.setItem("accessToken", newAccess);
        localStorage.setItem("refreshToken", newRefresh);
        setUser({ userId, email, roles, permissions });
      } catch {
        try {
          await logoutService({ refreshToken: currentRefresh });
        } catch {
          // Ignore logout errors
        }
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        clearUser();
        navigate({ to: "/" });
      }
    };

    intervalRef.current = setInterval(
      refresh,
      config.VITE_TOKEN_REFRESH_INTERVAL_MS,
    );

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAuthenticated, navigate, setUser, clearUser]);
};
