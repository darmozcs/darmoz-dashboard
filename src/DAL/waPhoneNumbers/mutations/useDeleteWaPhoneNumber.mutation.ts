import { WA_PHONE_NUMBER_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWaPhoneNumberService } from "../services/waPhoneNumber.service";

export const useDeleteWaPhoneNumberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWaPhoneNumberService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_PHONE_NUMBER_LIST] });
    },
  });
};
