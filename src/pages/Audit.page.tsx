import { useTranslation } from "react-i18next";
import { PageHeader } from "@/modules/common/components";

export const Audit = () => {
  const { t } = useTranslation("common");

  return <PageHeader title={t("menu.audit", "Audit")} />;
};
