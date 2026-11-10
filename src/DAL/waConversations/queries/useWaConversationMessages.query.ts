import { WA_CONVERSATION_MESSAGES } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import { getWaConversationMessagesService } from "../services/waConversation.service";

export const useWaConversationMessagesQuery = (id: string | null) => {
  return useApiQuery({
    queryKey: [WA_CONVERSATION_MESSAGES, id],
    queryFn: async () => await getWaConversationMessagesService(id ?? ""),
    enabled: id !== null,
  });
};
