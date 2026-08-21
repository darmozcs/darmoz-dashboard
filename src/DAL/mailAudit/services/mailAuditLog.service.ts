import { MAIL_AUDIT_LOGS_PATH, MAIL_AUDIT_LOG_RESEND_PATH } from "@/DAL/const";
import { httpClient } from "@/libs";
import type { MailAuditLog } from "@/models";
import type { AxiosResponse } from "axios";

export interface MailAuditLogFilters {
  recipient?: string;
  clientId?: string;
  accion?: string;
  from?: string;
  to?: string;
}

export const getMailAuditLogsService = async (
  filters: MailAuditLogFilters = {},
): Promise<AxiosResponse<MailAuditLog[]>> =>
  await httpClient.get<MailAuditLog[]>(MAIL_AUDIT_LOGS_PATH, {
    params: filters,
  });

export const resendMailAuditLogService = async (
  id: number,
): Promise<AxiosResponse<void>> =>
  await httpClient.post<void>(MAIL_AUDIT_LOG_RESEND_PATH({ id }));
