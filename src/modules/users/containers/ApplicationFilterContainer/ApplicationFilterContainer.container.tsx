import { ApplicationSelect } from "@/modules/common/components";
import { useUsersMasterFiltersStore } from "@/store";
import { useTranslation } from "react-i18next";

export const ApplicationFilterContainer = () => {
  const { t } = useTranslation("users");
  const { applicationId, setApplicationId } = useUsersMasterFiltersStore();

  return (
    <ApplicationSelect
      value={applicationId}
      onChange={setApplicationId}
      placeholder={t("master.filterApplication", "Filter by application")}
      clearable
    />
  );
};
