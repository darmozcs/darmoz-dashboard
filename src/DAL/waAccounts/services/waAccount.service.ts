import {
  WA_ACCOUNTS_PATH,
  WA_ACCOUNT_ACTION_PATH,
  WA_ACCOUNT_DETAIL_PATH,
} from "@/DAL/const";
import { httpClient } from "@/libs";
import type {
  WaAccount,
  WaAccountValidation,
  WaPhoneNumber,
  WaWebhookInfo,
} from "@/models";
import type { AxiosResponse } from "axios";

export interface CreateWaAccountPayload {
  name: string;
  appId?: string;
  appSecret: string;
  accessToken: string;
  wabaId: string;
  graphApiVersion?: string;
  active?: boolean;
}

// Secretos vacíos = no cambiar.
export interface UpdateWaAccountPayload {
  name?: string;
  appId?: string;
  appSecret?: string;
  accessToken?: string;
  wabaId?: string;
  graphApiVersion?: string;
  active?: boolean;
}

export const getWaAccountsService = async (): Promise<
  AxiosResponse<WaAccount[]>
> => await httpClient.get<WaAccount[]>(WA_ACCOUNTS_PATH);

export const createWaAccountService = async (
  payload: CreateWaAccountPayload,
): Promise<AxiosResponse<WaAccount>> =>
  await httpClient.post<WaAccount>(WA_ACCOUNTS_PATH, payload);

export const updateWaAccountService = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateWaAccountPayload;
}): Promise<AxiosResponse<WaAccount>> =>
  await httpClient.patch<WaAccount>(WA_ACCOUNT_DETAIL_PATH({ id }), payload);

export const deleteWaAccountService = async (
  id: string,
): Promise<AxiosResponse<void>> =>
  await httpClient.delete<void>(WA_ACCOUNT_DETAIL_PATH({ id }));

export const validateWaAccountService = async (
  id: string,
): Promise<AxiosResponse<WaAccountValidation>> =>
  await httpClient.post<WaAccountValidation>(
    WA_ACCOUNT_ACTION_PATH({ id, action: "validate" }),
  );

export const syncWaAccountNumbersService = async (
  id: string,
): Promise<AxiosResponse<WaPhoneNumber[]>> =>
  await httpClient.post<WaPhoneNumber[]>(
    WA_ACCOUNT_ACTION_PATH({ id, action: "sync-numbers" }),
  );

export const subscribeWaAccountService = async (
  id: string,
): Promise<AxiosResponse<void>> =>
  await httpClient.post<void>(WA_ACCOUNT_ACTION_PATH({ id, action: "subscribe" }));

export const getWaAccountWebhookInfoService = async (
  id: string,
): Promise<AxiosResponse<WaWebhookInfo>> =>
  await httpClient.get<WaWebhookInfo>(
    WA_ACCOUNT_ACTION_PATH({ id, action: "webhook-info" }),
  );

export const regenerateWaVerifyTokenService = async (
  id: string,
): Promise<AxiosResponse<WaWebhookInfo>> =>
  await httpClient.post<WaWebhookInfo>(
    WA_ACCOUNT_ACTION_PATH({ id, action: "regenerate-verify-token" }),
  );
