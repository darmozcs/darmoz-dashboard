import { WA_ACCOUNT_WEBHOOK_INFO } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { regenerateWaVerifyTokenService } from "../services/waAccount.service";

export const useRegenerateWaVerifyTokenMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: regenerateWaVerifyTokenService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_ACCOUNT_WEBHOOK_INFO] });
    },
  });
};
