import {
  WA_INTEGRATIONS_PATH,
  WA_INTEGRATION_DETAIL_PATH,
  WA_INTEGRATION_TEST_PATH,
} from "@/DAL/const";
import { httpClient } from "@/libs";
import type { WaIntegration, WaIntegrationTestResult } from "@/models";
import type { AxiosResponse } from "axios";

export interface CreateWaIntegrationPayload {
  applicationId: string;
  applicationName: string;
  baseUrl: string;
  authHeaderName?: string;
  authHeaderValue?: string;
  timeoutMs?: number;
}

// authHeaderValue vacío = no cambiar; clearAuthHeader=true lo borra.
export interface UpdateWaIntegrationPayload {
  applicationName?: string;
  baseUrl?: string;
  authHeaderName?: string;
  authHeaderValue?: string;
  clearAuthHeader?: boolean;
  timeoutMs?: number;
}

export interface TestWaIntegrationPayload {
  method: string;
  path: string;
}

export const getWaIntegrationsService = async (): Promise<
  AxiosResponse<WaIntegration[]>
> => await httpClient.get<WaIntegration[]>(WA_INTEGRATIONS_PATH);

export const createWaIntegrationService = async (
  payload: CreateWaIntegrationPayload,
): Promise<AxiosResponse<WaIntegration>> =>
  await httpClient.post<WaIntegration>(WA_INTEGRATIONS_PATH, payload);

export const updateWaIntegrationService = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateWaIntegrationPayload;
}): Promise<AxiosResponse<WaIntegration>> =>
  await httpClient.patch<WaIntegration>(
    WA_INTEGRATION_DETAIL_PATH({ id }),
    payload,
  );

export const deleteWaIntegrationService = async (
  id: string,
): Promise<AxiosResponse<void>> =>
  await httpClient.delete<void>(WA_INTEGRATION_DETAIL_PATH({ id }));

export const testWaIntegrationService = async ({
  id,
  payload,
}: {
  id: string;
  payload: TestWaIntegrationPayload;
}): Promise<AxiosResponse<WaIntegrationTestResult>> =>
  await httpClient.post<WaIntegrationTestResult>(
    WA_INTEGRATION_TEST_PATH({ id }),
    payload,
  );
