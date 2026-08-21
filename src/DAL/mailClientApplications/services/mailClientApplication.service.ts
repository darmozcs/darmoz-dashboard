import {
  MAIL_CLIENT_APPLICATIONS_PATH,
  MAIL_CLIENT_APPLICATION_DETAIL_PATH,
} from "@/DAL/const";
import { httpClient } from "@/libs";
import type { MailClientApplication } from "@/models";
import type { AxiosResponse } from "axios";

export interface MailClientApplicationFilters {
  active?: boolean;
}

export interface CreateMailClientApplicationPayload {
  name: string;
  active?: boolean;
}

export interface UpdateMailClientApplicationPayload {
  name?: string;
  active?: boolean;
}

export const getMailClientApplicationsService = async (
  filters: MailClientApplicationFilters = {},
): Promise<AxiosResponse<MailClientApplication[]>> =>
  await httpClient.get<MailClientApplication[]>(MAIL_CLIENT_APPLICATIONS_PATH, {
    params: filters,
  });

export const createMailClientApplicationService = async (
  payload: CreateMailClientApplicationPayload,
): Promise<AxiosResponse<MailClientApplication>> =>
  await httpClient.post<MailClientApplication>(
    MAIL_CLIENT_APPLICATIONS_PATH,
    payload,
  );

export const updateMailClientApplicationService = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateMailClientApplicationPayload;
}): Promise<AxiosResponse<MailClientApplication>> =>
  await httpClient.patch<MailClientApplication>(
    MAIL_CLIENT_APPLICATION_DETAIL_PATH({ id }),
    payload,
  );

export const deleteMailClientApplicationService = async (
  id: string,
): Promise<AxiosResponse<void>> =>
  await httpClient.delete<void>(MAIL_CLIENT_APPLICATION_DETAIL_PATH({ id }));
