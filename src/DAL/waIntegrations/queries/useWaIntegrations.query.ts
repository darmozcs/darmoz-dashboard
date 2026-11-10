import { WA_INTEGRATION_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import { getWaIntegrationsService } from "../services/waIntegration.service";

export const useWaIntegrationsQuery = () => {
  return useApiQuery({
    queryKey: [WA_INTEGRATION_LIST],
    queryFn: async () => await getWaIntegrationsService(),
  });
};
