import { verifyService } from "@/DAL/auth/services/auth.service";
import { AUTH_SESSION } from "@/DAL/const";
import { forceLogout, tokenStorage } from "@/libs";
import { useUserStore } from "@/store";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SUPER_ROLE = "SUPER";

export const useAuthGuard = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const setUser = useUserStore((s) => s.setUser);
  const clearUser = useUserStore((s) => s.clearUser);
  const accessToken = tokenStorage.getAccess();

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
  const isNotSuper = isAuthenticated && !data?.roles?.includes(SUPER_ROLE);

  useEffect(() => {
    if (!hasToken) {
      clearUser();
      navigate({ to: "/" });
    }
  }, [hasToken, navigate, clearUser]);

  useEffect(() => {
    if (isInvalid) {
      tokenStorage.clear();
      clearUser();
      navigate({ to: "/" });
    }
  }, [isInvalid, navigate, clearUser]);

  useEffect(() => {
    if (isNotSuper) {
      notifications.show({
        color: "red",
        title: "Error",
        message: t(
          "auth.notAuthorized",
          "Tu cuenta no tiene permisos de administrador",
        ),
      });
      forceLogout();
    }
  }, [isNotSuper, t]);

  useEffect(() => {
    if (isAuthenticated && !isNotSuper && data) {
      setUser({
        userId: data.userId!,
        email: data.email!,
        roles: data.roles!,
        permissions: data.permissions!,
      });
    }
  }, [isAuthenticated, isNotSuper, data, setUser]);

  return { hasToken, isVerifying: isPending, isAuthenticated };
};
