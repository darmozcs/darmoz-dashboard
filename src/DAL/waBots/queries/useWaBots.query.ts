import { WA_BOT_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import type { WaBotFilters } from "../services/waBot.service";
import { getWaBotsService } from "../services/waBot.service";

export const useWaBotsQuery = (filters: WaBotFilters = {}) => {
  return useApiQuery({
    queryKey: [WA_BOT_LIST, filters],
    queryFn: async () => await getWaBotsService(filters),
  });
};
