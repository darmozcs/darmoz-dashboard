import { WA_ACCOUNT_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWaAccountService } from "../services/waAccount.service";

export const useCreateWaAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWaAccountService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_ACCOUNT_LIST] });
    },
  });
};
