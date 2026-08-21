import {
  MAIL_SCHEDULED_EMAILS_PATH,
  MAIL_SCHEDULED_EMAIL_DETAIL_PATH,
} from "@/DAL/const";
import { httpClient } from "@/libs";
import type { ScheduledEmail, ScheduledEmailStatus } from "@/models";
import type { AxiosResponse } from "axios";

export interface ScheduledEmailFilters {
  status?: ScheduledEmailStatus;
}

export interface ScheduledEmailPayload {
  recipient: string;
  subject?: string;
  templateCode?: string;
  variables?: Record<string, string>;
  bodyOverride?: string;
  scheduledAt: string;
  clientId: string;
}

export const getScheduledEmailsService = async (
  filters: ScheduledEmailFilters = {},
): Promise<AxiosResponse<ScheduledEmail[]>> =>
  await httpClient.get<ScheduledEmail[]>(MAIL_SCHEDULED_EMAILS_PATH, {
    params: filters,
  });

export const createScheduledEmailService = async (
  payload: ScheduledEmailPayload,
): Promise<AxiosResponse<ScheduledEmail>> =>
  await httpClient.post<ScheduledEmail>(MAIL_SCHEDULED_EMAILS_PATH, payload);

export const updateScheduledEmailService = async ({
  id,
  payload,
}: {
  id: number;
  payload: ScheduledEmailPayload;
}): Promise<AxiosResponse<ScheduledEmail>> =>
  await httpClient.put<ScheduledEmail>(
    MAIL_SCHEDULED_EMAIL_DETAIL_PATH({ id }),
    payload,
  );

// Cancels the scheduled email (sets status to CANCELLED) — the backend
// does not hard-delete these rows.
export const cancelScheduledEmailService = async (
  id: number,
): Promise<AxiosResponse<void>> =>
  await httpClient.delete<void>(MAIL_SCHEDULED_EMAIL_DETAIL_PATH({ id }));
