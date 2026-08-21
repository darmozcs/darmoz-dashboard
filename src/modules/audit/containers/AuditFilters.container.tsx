import { DateRangeFilter } from "@/modules/common/components";
import { useAuditFiltersStore } from "@/store";
import { useTranslation } from "react-i18next";

export const AuditFiltersContainer = () => {
  const { t } = useTranslation("audit");
  const { from, to, setFrom, setTo } = useAuditFiltersStore();

  return (
    <DateRangeFilter
      from={from}
      to={to}
      onFromChange={setFrom}
      onToChange={setTo}
      fromPlaceholder={t("filters.from", "From")}
      toPlaceholder={t("filters.to", "To")}
    />
  );
};
