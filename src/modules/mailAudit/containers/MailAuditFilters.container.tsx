import { DateTimeRangeFilter } from "@/modules/common/components";
import { useMailAuditFiltersStore } from "@/store";
import { useTranslation } from "react-i18next";

export const MailAuditFiltersContainer = () => {
  const { t } = useTranslation("mailAudit");
  const { from, to, setFrom, setTo } = useMailAuditFiltersStore();

  return (
    <DateTimeRangeFilter
      from={from}
      to={to}
      onFromChange={setFrom}
      onToChange={setTo}
      fromPlaceholder={t("filters.from", "From")}
      toPlaceholder={t("filters.to", "To")}
    />
  );
};
