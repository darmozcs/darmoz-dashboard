import { useMutation } from "@tanstack/react-query";
import { logoutService } from "../services/auth.service";

export const useLogoutMutation = () =>
  useMutation({
    mutationFn: ({ refreshToken }: { refreshToken: string }) =>
      logoutService({ refreshToken }),
  });
