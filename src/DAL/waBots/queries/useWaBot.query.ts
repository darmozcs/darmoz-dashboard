import { WA_BOT_DETAIL } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import { getWaBotService } from "../services/waBot.service";

export const useWaBotQuery = (id: string) => {
  return useApiQuery({
    queryKey: [WA_BOT_DETAIL, id],
    queryFn: async () => await getWaBotService(id),
  });
};
