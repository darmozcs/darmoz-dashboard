import { notifications } from "@mantine/notifications";
import { i18n } from "@/libs/i18n";
import { queryClient } from "@/libs/query";
import type { AuthResponse } from "@/models";
import { useUserStore } from "@/store";
import { tokenStorage } from "./tokenStorage";

const SUPER_ROLE = "SUPER";

export const applySuperGatedSession = (
  authResponse: AuthResponse,
): boolean => {
  if (!authResponse.roles.includes(SUPER_ROLE)) {
    notifications.show({
      color: "red",
      title: "Error",
      message: i18n.t(
        "common:auth.notAuthorized",
        "Tu cuenta no tiene permisos de administrador",
      ),
    });
    return false;
  }

  tokenStorage.setTokens(authResponse.accessToken, authResponse.refreshToken);
  useUserStore.getState().setUser({
    userId: authResponse.userId,
    email: authResponse.email,
    roles: authResponse.roles,
    permissions: authResponse.permissions,
  });
  return true;
};

export const forceLogout = () => {
  tokenStorage.clear();
  useUserStore.getState().clearUser();
  queryClient.clear();
  window.location.assign(import.meta.env.BASE_URL);
};
