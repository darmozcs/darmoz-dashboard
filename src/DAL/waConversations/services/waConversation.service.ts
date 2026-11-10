import {
  WA_CONVERSATIONS_PATH,
  WA_CONVERSATION_MESSAGES_PATH,
  WA_CONVERSATION_RESET_PATH,
} from "@/DAL/const";
import { httpClient } from "@/libs";
import type {
  WaConversation,
  WaConversationStatus,
  WaMessageLog,
  WaPage,
} from "@/models";
import type { AxiosResponse } from "axios";

// page empieza en 0 (Spring).
export interface WaConversationFilters {
  phoneNumberId?: string;
  contact?: string;
  status?: WaConversationStatus;
  page: number;
  size: number;
}

export const getWaConversationsService = async (
  filters: WaConversationFilters,
): Promise<AxiosResponse<WaPage<WaConversation>>> =>
  await httpClient.get<WaPage<WaConversation>>(WA_CONVERSATIONS_PATH, {
    params: filters,
  });

export const getWaConversationMessagesService = async (
  id: string,
): Promise<AxiosResponse<WaMessageLog[]>> =>
  await httpClient.get<WaMessageLog[]>(WA_CONVERSATION_MESSAGES_PATH({ id }));

export const resetWaConversationService = async (
  id: string,
): Promise<AxiosResponse<WaConversation>> =>
  await httpClient.post<WaConversation>(WA_CONVERSATION_RESET_PATH({ id }));
