import { confirmDelete } from "@/libs/ui/confirm/confirmDelete";
import type { DataTableColumn } from "@/libs/ui/table";
import type { MailAuditLog } from "@/models";
import { ActionIcon } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import type { TFunction } from "i18next";

interface MailAuditTableActions {
  onResend: (log: MailAuditLog) => void;
}

export const getMailAuditTableColumns = (
  t: TFunction,
  actions: MailAuditTableActions,
): DataTableColumn<MailAuditLog>[] =>
  [
    {
      accessor: "sentAt",
      title: t("master.sentAt", "Sent at"),
      width: 180,
    },
    {
      accessor: "recipient",
      title: t("master.recipient", "Recipient"),
      width: 220,
    },
    {
      accessor: "subject",
      title: t("master.subject", "Subject"),
    },
    {
      accessor: "accion",
      title: t("master.accion", "Action"),
      width: 140,
    },
    {
      accessor: "actions",
      title: "",
      width: 60,
      render: (log) =>
        log.resendable ? (
          <ActionIcon
            variant="subtle"
            onClick={() =>
              confirmDelete({
                title: t("resendTitle", "Resend email"),
                message: t("resendMessage", {
                  defaultValue: 'Resend this email to "{{recipient}}"?',
                  recipient: log.recipient,
                }),
                onConfirm: () => actions.onResend(log),
              })
            }
          >
            <IconSend size={16} />
          </ActionIcon>
        ) : null,
    },
  ] as const;
