import { WA_MESSAGE_LOGS_PATH } from "@/DAL/const";
import { httpClient } from "@/libs";
import type {
  WaMessageDirection,
  WaMessageLog,
  WaMessageStatus,
  WaPage,
} from "@/models";
import type { AxiosResponse } from "axios";

// page empieza en 0 (Spring). from/to en ISO-8601.
export interface WaMessageLogFilters {
  phoneNumberId?: string;
  contact?: string;
  direction?: WaMessageDirection;
  status?: WaMessageStatus;
  from?: string;
  to?: string;
  page: number;
  size: number;
}

export const getWaMessageLogsService = async (
  filters: WaMessageLogFilters,
): Promise<AxiosResponse<WaPage<WaMessageLog>>> =>
  await httpClient.get<WaPage<WaMessageLog>>(WA_MESSAGE_LOGS_PATH, {
    params: filters,
  });
