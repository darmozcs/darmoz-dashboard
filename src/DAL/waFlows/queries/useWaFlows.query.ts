import { WA_FLOW_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import { getWaFlowsService } from "../services/waFlow.service";

export const useWaFlowsQuery = (botId: string | null) => {
  return useApiQuery({
    queryKey: [WA_FLOW_LIST, botId],
    queryFn: async () => await getWaFlowsService(botId ?? ""),
    enabled: botId !== null,
  });
};
