import { WA_ACCOUNT_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { validateWaAccountService } from "../services/waAccount.service";

export const useValidateWaAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: validateWaAccountService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_ACCOUNT_LIST] });
    },
  });
};
