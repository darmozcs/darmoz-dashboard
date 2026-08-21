import {
  ADMIN_APPLICATIONS_PATH,
  ADMIN_APPLICATION_DETAIL_PATH,
} from "@/DAL/const";
import { httpClient } from "@/libs";
import type { Aplication } from "@/models";
import type { AxiosResponse } from "axios";

export interface CreateApplicationPayload {
  serviceName: string;
  name: string;
  description?: string;
  unverifiedLoginLimit?: number;
}

export interface UpdateApplicationPayload {
  serviceName?: string;
  name?: string;
  description?: string;
  unverifiedLoginLimit?: number;
}

export const getApplicationsService = async (): Promise<
  AxiosResponse<Aplication[]>
> => await httpClient.get<Aplication[]>(ADMIN_APPLICATIONS_PATH);

export const createApplicationService = async (
  payload: CreateApplicationPayload,
): Promise<AxiosResponse<Aplication>> =>
  await httpClient.post<Aplication>(ADMIN_APPLICATIONS_PATH, payload);

export const updateApplicationService = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateApplicationPayload;
}): Promise<AxiosResponse<Aplication>> =>
  await httpClient.patch<Aplication>(
    ADMIN_APPLICATION_DETAIL_PATH({ id }),
    payload,
  );

export const deleteApplicationService = async (
  id: string,
): Promise<AxiosResponse<void>> =>
  await httpClient.delete<void>(ADMIN_APPLICATION_DETAIL_PATH({ id }));
