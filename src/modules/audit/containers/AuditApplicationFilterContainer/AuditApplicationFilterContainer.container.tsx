import { ApplicationSelect } from "@/modules/common/components";
import { useAuditFiltersStore } from "@/store";
import { useTranslation } from "react-i18next";

export const AuditApplicationFilterContainer = () => {
  const { t } = useTranslation("audit");
  const { applicationId, setApplicationId } = useAuditFiltersStore();

  return (
    <ApplicationSelect
      value={applicationId}
      onChange={setApplicationId}
      placeholder={t("filters.application", "Filter by application")}
      clearable
    />
  );
};
