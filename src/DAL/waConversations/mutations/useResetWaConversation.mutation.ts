import { WA_CONVERSATION_LIST, WA_CONVERSATION_MESSAGES } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetWaConversationService } from "../services/waConversation.service";

export const useResetWaConversationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetWaConversationService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WA_CONVERSATION_LIST] });
      queryClient.invalidateQueries({ queryKey: [WA_CONVERSATION_MESSAGES] });
    },
  });
};
