import { useResendMailAuditLogMutation } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import type { MailAuditLog } from "@/models";
import { notifications } from "@mantine/notifications";
import { useTranslation } from "react-i18next";

export const useMailAuditMasterTable = () => {
  const { t } = useTranslation("mailAudit");
  const resendMutation = useResendMailAuditLogMutation();

  const handleResend = (log: MailAuditLog) => {
    resendMutation.mutate(log.id, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          title: "Success",
          message: t("resendSuccess", "Email resent"),
        });
      },
      onError: (error: unknown) => {
        notifications.show({
          color: "red",
          title: "Error",
          message: extractErrorMessage(error, "Resend failed"),
        });
      },
    });
  };

  return { handleResend };
};
