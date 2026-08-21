import { confirmDelete } from "@/libs/ui/confirm/confirmDelete";
import type { DataTableColumn } from "@/libs/ui/table";
import type { MailAuditLog } from "@/models";
import { MailClientApplicationSelect } from "@/modules/common/components";
import { ActionIcon } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import type { TFunction } from "i18next";
import { AccionFilterContainer, RecipientFilterContainer } from "../containers";

interface MailAuditTableActions {
  onResend: (log: MailAuditLog) => void;
}

interface MailAuditTableFilters {
  recipient: string;
  accion: string;
  clientId: string | null;
}

export const getMailAuditTableColumns = (
  t: TFunction,
  filters: MailAuditTableFilters,
  actions: MailAuditTableActions,
  onClientIdChange: (value: string | null) => void,
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
      filter: <RecipientFilterContainer />,
      filtering: filters.recipient !== "",
    },
    {
      accessor: "subject",
      title: t("master.subject", "Subject"),
    },
    {
      accessor: "applicationName",
      title: t("master.application", "Application"),
      width: 180,
      filter: (
        <MailClientApplicationSelect
          value={filters.clientId}
          onChange={onClientIdChange}
          clearable
        />
      ),
      filtering: filters.clientId !== null,
    },
    {
      accessor: "accion",
      title: t("master.accion", "Action"),
      width: 140,
      filter: <AccionFilterContainer />,
      filtering: filters.accion !== "",
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
