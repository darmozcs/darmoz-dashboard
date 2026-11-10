import { WA_CONVERSATION_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import type { WaConversationFilters } from "../services/waConversation.service";
import { getWaConversationsService } from "../services/waConversation.service";

export const useWaConversationsQuery = (filters: WaConversationFilters) => {
  return useApiQuery({
    queryKey: [WA_CONVERSATION_LIST, filters],
    queryFn: async () => await getWaConversationsService(filters),
  });
};
