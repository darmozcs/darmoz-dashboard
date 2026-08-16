import { verifyService } from "@/DAL/auth/services/auth.service";
import { AUTH_SESSION } from "@/DAL/const";
import { useUserStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.clearUser);
  const accessToken = localStorage.getItem("accessToken");

  const { data, isPending, isSuccess } = useQuery({
    queryKey: [AUTH_SESSION],
    queryFn: async () => {
      const response = await verifyService();
      return response.data;
    },
    enabled: !!accessToken,
    retry: false,
    staleTime: Infinity,
  });

  const hasToken = !!accessToken;
  const isAuthenticated = isSuccess && data?.valid === true;
  const isInvalid = isSuccess && data?.valid === false;

  useEffect(() => {
    if (!hasToken) {
      clearUser();
      navigate({ to: "/" });
    }
  }, [hasToken, navigate, clearUser]);

  useEffect(() => {
    if (isInvalid) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      clearUser();
      navigate({ to: "/" });
    }
  }, [isInvalid, navigate, clearUser]);

  useEffect(() => {
    if (isAuthenticated && data) {
      setUser({
        userId: data.userId!,
        email: data.email!,
        roles: data.roles!,
        permissions: data.permissions!,
      });
    }
  }, [isAuthenticated, data, setUser]);

  return { hasToken, isVerifying: isPending, isAuthenticated };
};
