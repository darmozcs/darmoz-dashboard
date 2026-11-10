import { WA_ACCOUNT_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWaAccountService } from "../services/waAccount.service";

export const useUpdateWaAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWaAccountService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_ACCOUNT_LIST] });
    },
  });
};
