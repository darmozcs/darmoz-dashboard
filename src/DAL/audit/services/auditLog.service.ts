import { ADMIN_AUDIT_LOG_PATH } from "@/DAL/const";
import { httpClient } from "@/libs";
import type { AuditAction, AuditLog, PageResponse } from "@/models";
import type { AxiosResponse } from "axios";

export interface AuditLogFilters {
  action?: AuditAction | null;
  applicationId?: string | null;
  email?: string;
  from?: string | null;
  to?: string | null;
  page?: number;
  size?: number;
}

export const getAuditLogService = async (
  filters: AuditLogFilters = {},
): Promise<AxiosResponse<PageResponse<AuditLog>>> =>
  await httpClient.get<PageResponse<AuditLog>>(ADMIN_AUDIT_LOG_PATH, {
    params: filters,
  });
