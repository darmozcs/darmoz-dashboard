import { WA_BOT_LIST, WA_PHONE_NUMBER_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWaBotService } from "../services/waBot.service";

export const useDeleteWaBotMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWaBotService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_BOT_LIST] });
      queryClient.invalidateQueries({ queryKey: [WA_PHONE_NUMBER_LIST] });
    },
  });
};
