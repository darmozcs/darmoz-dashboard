import { confirmDelete } from "@/libs/ui/confirm/confirmDelete";
import type { DataTableColumn } from "@/libs/ui/table";
import type { ScheduledEmail, ScheduledEmailStatus } from "@/models";
import { ActionIcon, Badge, Group } from "@mantine/core";
import { IconPencil, IconX } from "@tabler/icons-react";
import type { TFunction } from "i18next";

const STATUS_COLORS: Record<ScheduledEmailStatus, string> = {
  PENDING: "yellow",
  PROCESSING: "blue",
  SENT: "green",
  FAILED: "red",
  CANCELLED: "gray",
};

interface ScheduledEmailsTableActions {
  onEdit: (scheduledEmail: ScheduledEmail) => void;
  onCancel: (scheduledEmail: ScheduledEmail) => void;
}

export const getScheduledEmailsTableColumns = (
  t: TFunction,
  actions: ScheduledEmailsTableActions,
): DataTableColumn<ScheduledEmail>[] =>
  [
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
      accessor: "scheduledAt",
      title: t("master.scheduledAt", "Scheduled for"),
      width: 180,
    },
    {
      accessor: "status",
      title: t("master.status", "Status"),
      width: 130,
      render: (scheduledEmail) => (
        <Badge color={STATUS_COLORS[scheduledEmail.status]} variant="light">
          {scheduledEmail.status}
        </Badge>
      ),
    },
    {
      accessor: "attempts",
      title: t("master.attempts", "Attempts"),
      width: 100,
    },
    {
      accessor: "actions",
      title: "",
      width: 90,
      render: (scheduledEmail) => {
        const isPending = scheduledEmail.status === "PENDING";
        const isCancellable = scheduledEmail.status !== "SENT" && scheduledEmail.status !== "CANCELLED";

        return (
          <Group gap="xs" wrap="nowrap">
            {isPending && (
              <ActionIcon
                variant="subtle"
                onClick={() => actions.onEdit(scheduledEmail)}
              >
                <IconPencil size={18} />
              </ActionIcon>
            )}
            {isCancellable && (
              <ActionIcon
                variant="subtle"
                color="red"
                onClick={() =>
                  confirmDelete({
                    title: t("cancelTitle", "Cancel scheduled email"),
                    message: t("cancelMessage", {
                      defaultValue:
                        'Are you sure you want to cancel the email to "{{recipient}}"?',
                      recipient: scheduledEmail.recipient,
                    }),
                    onConfirm: () => actions.onCancel(scheduledEmail),
                  })
                }
              >
                <IconX size={18} />
              </ActionIcon>
            )}
          </Group>
        );
      },
    },
  ] as const;
