import { useEffect, useRef } from "react";
import { config } from "@/config";
import { logoutService, refreshService } from "@/DAL/auth";
import { applySuperGatedSession, forceLogout, tokenStorage } from "@/libs";

export const useTokenRefresh = (isAuthenticated: boolean) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const refreshToken = tokenStorage.getRefresh();
    const accessToken = tokenStorage.getAccess();

    if (!refreshToken || !accessToken) {
      forceLogout();
      return;
    }

    const refresh = async () => {
      const currentRefresh = tokenStorage.getRefresh();
      const currentAccess = tokenStorage.getAccess();

      if (!currentRefresh || !currentAccess) {
        forceLogout();
        return;
      }

      try {
        const response = await refreshService({ refreshToken: currentRefresh });
        if (!applySuperGatedSession(response.data)) {
          forceLogout();
        }
      } catch {
        try {
          await logoutService({ refreshToken: currentRefresh });
        } catch {
          // Ignore logout errors
        }
        forceLogout();
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
  }, [isAuthenticated]);
};
