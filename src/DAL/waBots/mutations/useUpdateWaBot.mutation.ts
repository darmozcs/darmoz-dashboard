import { WA_BOT_LIST, WA_BOT_DETAIL } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWaBotService } from "../services/waBot.service";

export const useUpdateWaBotMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWaBotService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_BOT_LIST] });
      queryClient.invalidateQueries({ queryKey: [WA_BOT_DETAIL] });
    },
  });
};
