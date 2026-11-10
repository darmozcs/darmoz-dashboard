import { WA_PHONE_NUMBER_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { syncWaAccountNumbersService } from "../services/waAccount.service";

export const useSyncWaAccountNumbersMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: syncWaAccountNumbersService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_PHONE_NUMBER_LIST] });
    },
  });
};
