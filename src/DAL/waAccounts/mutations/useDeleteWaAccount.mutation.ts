import { WA_ACCOUNT_LIST, WA_PHONE_NUMBER_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWaAccountService } from "../services/waAccount.service";

export const useDeleteWaAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWaAccountService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_ACCOUNT_LIST] });
      queryClient.invalidateQueries({ queryKey: [WA_PHONE_NUMBER_LIST] });
    },
  });
};
