import { WA_BOT_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWaBotService } from "../services/waBot.service";

export const useCreateWaBotMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWaBotService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_BOT_LIST] });
    },
  });
};
