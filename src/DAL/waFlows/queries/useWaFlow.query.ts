import { WA_FLOW_DETAIL } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import { getWaFlowService } from "../services/waFlow.service";

export const useWaFlowQuery = (botId: string, flowId: string) => {
  return useApiQuery({
    queryKey: [WA_FLOW_DETAIL, botId, flowId],
    queryFn: async () => await getWaFlowService({ botId, flowId }),
    // El editor trabaja sobre una copia local: no refrescar solo y pisar cambios.
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
