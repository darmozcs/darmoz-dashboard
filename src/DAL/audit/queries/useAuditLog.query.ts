import { AUDIT_LOG_LIST } from "@/DAL/const";
import { useApiQuery } from "@/libs";
import type { AuditLogFilters } from "../services/auditLog.service";
import { getAuditLogService } from "../services/auditLog.service";

export const useAuditLogQuery = (filters: AuditLogFilters = {}) => {
  return useApiQuery({
    queryKey: [AUDIT_LOG_LIST, filters],
    queryFn: async () => await getAuditLogService(filters),
  });
};
