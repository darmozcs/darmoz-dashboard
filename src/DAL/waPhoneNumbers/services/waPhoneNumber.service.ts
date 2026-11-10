import {
  WA_PHONE_NUMBERS_PATH,
  WA_PHONE_NUMBER_DETAIL_PATH,
  WA_PHONE_NUMBER_TEST_MESSAGE_PATH,
} from "@/DAL/const";
import { httpClient } from "@/libs";
import type { WaMessageLog, WaPhoneNumber } from "@/models";
import type { AxiosResponse } from "axios";

export interface WaPhoneNumberFilters {
  accountId?: string;
  botId?: string;
}

// botId null + unassignBot=true quita el bot del número.
export interface UpdateWaPhoneNumberPayload {
  botId?: string | null;
  unassignBot?: boolean;
  active?: boolean;
}

export interface SendWaTestMessagePayload {
  to: string;
  text: string;
}

export const getWaPhoneNumbersService = async (
  filters: WaPhoneNumberFilters = {},
): Promise<AxiosResponse<WaPhoneNumber[]>> =>
  await httpClient.get<WaPhoneNumber[]>(WA_PHONE_NUMBERS_PATH, {
    params: filters,
  });

export const updateWaPhoneNumberService = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateWaPhoneNumberPayload;
}): Promise<AxiosResponse<WaPhoneNumber>> =>
  await httpClient.patch<WaPhoneNumber>(
    WA_PHONE_NUMBER_DETAIL_PATH({ id }),
    payload,
  );

export const deleteWaPhoneNumberService = async (
  id: string,
): Promise<AxiosResponse<void>> =>
  await httpClient.delete<void>(WA_PHONE_NUMBER_DETAIL_PATH({ id }));

export const sendWaTestMessageService = async ({
  id,
  payload,
}: {
  id: string;
  payload: SendWaTestMessagePayload;
}): Promise<AxiosResponse<WaMessageLog>> =>
  await httpClient.post<WaMessageLog>(
    WA_PHONE_NUMBER_TEST_MESSAGE_PATH({ id }),
    payload,
  );
