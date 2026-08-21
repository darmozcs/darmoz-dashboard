import { useCancelScheduledEmailMutation, useScheduledEmailsQuery } from "@/DAL";
import { extractErrorMessage } from "@/libs";
import { DataTable } from "@/libs/ui/table";
import type { ScheduledEmail, ScheduledEmailStatus } from "@/models";
import { Select, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EditScheduledEmailModal } from "../../components/EditScheduledEmailModal/EditScheduledEmailModal";
import { getScheduledEmailsTableColumns } from "../../const/scheduledEmailsTableColumns.const";

const STATUS_OPTIONS: ScheduledEmailStatus[] = [
  "PENDING",
  "PROCESSING",
  "SENT",
  "FAILED",
  "CANCELLED",
];

export const ScheduledEmailsMasterTableContainer = () => {
  const { t } = useTranslation("scheduledEmails");
  const [status, setStatus] = useState<ScheduledEmailStatus | null>(null);
  const [selected, setSelected] = useState<ScheduledEmail | null>(null);

  const { data, isLoading } = useScheduledEmailsQuery(
    status ? { status } : {},
  );
  const cancelMutation = useCancelScheduledEmailMutation();
  const scheduledEmails = data?.data ?? [];

  const handleCancel = (scheduledEmail: ScheduledEmail) => {
    cancelMutation.mutate(scheduledEmail.id, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          title: "Success",
          message: t("cancelSuccess", "Scheduled email cancelled"),
        });
      },
      onError: (error: unknown) => {
        notifications.show({
          color: "red",
          title: "Error",
          message: extractErrorMessage(error, "Cancel failed"),
        });
      },
    });
  };

  const columns = getScheduledEmailsTableColumns(t, {
    onEdit: setSelected,
    onCancel: handleCancel,
  });

  return (
    <Stack h="100%">
      <Select
        placeholder={t("filterStatus", "Filter by status")}
        data={STATUS_OPTIONS}
        value={status}
        onChange={(value) => setStatus(value as ScheduledEmailStatus | null)}
        clearable
        w={220}
      />
      <DataTable
        records={scheduledEmails}
        columns={columns}
        fetching={isLoading}
      />
      <EditScheduledEmailModal
        scheduledEmail={selected}
        onClose={() => setSelected(null)}
      />
    </Stack>
  );
};
