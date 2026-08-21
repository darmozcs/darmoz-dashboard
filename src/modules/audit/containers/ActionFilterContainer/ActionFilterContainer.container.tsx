import { useAuditFiltersStore } from "@/store";
import type { AuditAction } from "@/models";
import { Select } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { AUDIT_ACTIONS } from "../../const/auditActionOptions.const";

export const ActionFilterContainer = () => {
  const { t } = useTranslation("audit");
  const { action, setAction } = useAuditFiltersStore();

  return (
    <Select
      placeholder={t("filters.action", "Action")}
      data={AUDIT_ACTIONS.map((value) => ({ value, label: value }))}
      value={action}
      onChange={(value) => setAction(value as AuditAction | null)}
      clearable
    />
  );
};
