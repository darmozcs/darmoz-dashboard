import { ApplicationSelect, EmailFilter } from "@/modules/common/components";
import { useAuditFiltersStore } from "@/store";
import type { AuditAction } from "@/models";
import { Group, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDebouncedCallback } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { AUDIT_ACTIONS } from "../const/auditActionOptions.const";

const DEBOUNCE_MS = 300;

export const AuditFiltersContainer = () => {
  const { t } = useTranslation("audit");
  const {
    action,
    applicationId,
    email,
    from,
    to,
    setAction,
    setApplicationId,
    setEmail,
    setFrom,
    setTo,
  } = useAuditFiltersStore();
  const debouncedSetEmail = useDebouncedCallback(setEmail, DEBOUNCE_MS);

  return (
    <Group wrap="wrap" gap="sm">
      <Select
        placeholder={t("filters.action", "Action")}
        data={AUDIT_ACTIONS.map((value) => ({ value, label: value }))}
        value={action}
        onChange={(value) => setAction(value as AuditAction | null)}
        clearable
        w={200}
      />
      <ApplicationSelect
        placeholder={t("filters.application", "Application")}
        value={applicationId}
        onChange={setApplicationId}
        clearable
        w={200}
      />
      <EmailFilter
        value={email}
        onChange={debouncedSetEmail}
        placeholder={t("filters.email", "Search by email...")}
      />
      <DatePickerInput
        placeholder={t("filters.from", "From")}
        value={from}
        onChange={setFrom}
        clearable
        w={160}
      />
      <DatePickerInput
        placeholder={t("filters.to", "To")}
        value={to}
        onChange={setTo}
        clearable
        w={160}
      />
    </Group>
  );
};
