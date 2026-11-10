import { WA_BOTS_PATH, WA_BOT_DETAIL_PATH } from "@/DAL/const";
import { httpClient } from "@/libs";
import type { WaBot, WaBusinessHours } from "@/models";
import type { AxiosResponse } from "axios";

export interface WaBotFilters {
  applicationId?: string;
}

// Alta y edición usan el mismo payload (PUT completo).
export interface SaveWaBotPayload {
  name: string;
  applicationId: string;
  active: boolean;
  entryFlowId: string | null;
  fallbackMessage: string | null;
  sessionTimeoutMinutes: number;
  businessHours: WaBusinessHours | null;
  outOfHoursMessage: string | null;
  staticVariables: Record<string, string> | null;
}

export const getWaBotsService = async (
  filters: WaBotFilters = {},
): Promise<AxiosResponse<WaBot[]>> =>
  await httpClient.get<WaBot[]>(WA_BOTS_PATH, { params: filters });

export const getWaBotService = async (
  id: string,
): Promise<AxiosResponse<WaBot>> =>
  await httpClient.get<WaBot>(WA_BOT_DETAIL_PATH({ id }));

export const createWaBotService = async (
  payload: SaveWaBotPayload,
): Promise<AxiosResponse<WaBot>> =>
  await httpClient.post<WaBot>(WA_BOTS_PATH, payload);

export const updateWaBotService = async ({
  id,
  payload,
}: {
  id: string;
  payload: SaveWaBotPayload;
}): Promise<AxiosResponse<WaBot>> =>
  await httpClient.put<WaBot>(WA_BOT_DETAIL_PATH({ id }), payload);

export const deleteWaBotService = async (
  id: string,
): Promise<AxiosResponse<void>> =>
  await httpClient.delete<void>(WA_BOT_DETAIL_PATH({ id }));
