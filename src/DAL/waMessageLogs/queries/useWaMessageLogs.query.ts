import { WA_MESSAGE_LOG_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import type { WaMessageLogFilters } from "../services/waMessageLog.service";
import { getWaMessageLogsService } from "../services/waMessageLog.service";

export const useWaMessageLogsQuery = (filters: WaMessageLogFilters) => {
  return useApiQuery({
    queryKey: [WA_MESSAGE_LOG_LIST, filters],
    queryFn: async () => await getWaMessageLogsService(filters),
  });
};
