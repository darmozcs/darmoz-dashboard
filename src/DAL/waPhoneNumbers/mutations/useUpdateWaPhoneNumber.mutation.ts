import { WA_PHONE_NUMBER_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWaPhoneNumberService } from "../services/waPhoneNumber.service";

export const useUpdateWaPhoneNumberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWaPhoneNumberService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_PHONE_NUMBER_LIST] });
    },
  });
};
