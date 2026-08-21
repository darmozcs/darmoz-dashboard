import type { ScheduledEmailStatus } from "@/models";
import { useScheduledEmailsFiltersStore } from "@/store";
import { Select } from "@mantine/core";
import { useTranslation } from "react-i18next";

const STATUS_OPTIONS: ScheduledEmailStatus[] = [
  "PENDING",
  "PROCESSING",
  "SENT",
  "FAILED",
  "CANCELLED",
];

export const StatusFilterContainer = () => {
  const { t } = useTranslation("scheduledEmails");
  const { status, setStatus } = useScheduledEmailsFiltersStore();

  return (
    <Select
      placeholder={t("filterStatus", "Filter by status")}
      data={STATUS_OPTIONS}
      value={status}
      onChange={(value) => setStatus(value as ScheduledEmailStatus | null)}
      clearable
    />
  );
};
