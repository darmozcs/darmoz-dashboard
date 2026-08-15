import { useNavigate } from "@tanstack/react-router";
import { useLogoutMutation } from "@/DAL/auth/mutations/useLogout.mutation";
import { useUserStore } from "@/store";

export const useLogoutButton = () => {
  const navigate = useNavigate();
  const clearUser = useUserStore((s) => s.clearUser);
  const logoutMutation = useLogoutMutation();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        await logoutMutation.mutateAsync({ refreshToken });
      } catch {
        // Ignore logout errors
      }
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    clearUser();
    navigate({ to: "/" });
  };

  return { handleLogout };
};
