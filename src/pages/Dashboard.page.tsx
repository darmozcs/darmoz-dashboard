import { useTranslation } from "react-i18next";
import { PageHeader } from "@/modules/common/components";

export const Dashboard = () => {
  const { t } = useTranslation("common");

  return <PageHeader title={t("dashboard.title", "Dashboard")} />;
};
