import { useLogoutMutation } from "@/DAL/auth/mutations/useLogout.mutation";
import { forceLogout, tokenStorage } from "@/libs";

export const useLogoutButton = () => {
  const logoutMutation = useLogoutMutation();

  const handleLogout = async () => {
    const refreshToken = tokenStorage.getRefresh();
    if (refreshToken) {
      try {
        await logoutMutation.mutateAsync({ refreshToken });
      } catch {
        // Ignore logout errors
      }
    }
    forceLogout();
  };

  return { handleLogout };
};
