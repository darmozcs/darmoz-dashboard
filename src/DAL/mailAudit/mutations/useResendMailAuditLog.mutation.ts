import { MAIL_AUDIT_LOG_LIST } from "@/DAL/const";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resendMailAuditLogService } from "../services/mailAuditLog.service";

export const useResendMailAuditLogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resendMailAuditLogService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MAIL_AUDIT_LOG_LIST] });
    },
  });
};
