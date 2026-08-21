import { MAIL_AUDIT_LOG_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import type { MailAuditLogFilters } from "../services/mailAuditLog.service";
import { getMailAuditLogsService } from "../services/mailAuditLog.service";

export const useMailAuditLogsQuery = (filters: MailAuditLogFilters = {}) => {
  return useApiQuery({
    queryKey: [MAIL_AUDIT_LOG_LIST, filters],
    queryFn: async () => await getMailAuditLogsService(filters),
  });
};
